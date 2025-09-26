const r=`---\r
title: "MCP协议与应用实战：从Stdio到SSE与FastMCP实现"\r
date: "2025-07-26"\r
excerpt: "深入解析MCP（Model Context Protocol）的通信机制与应用场景，涵盖Stdio、SSE、Streamable-HTTP等传输方式，并展示如何基于FastMCP构建自定义MCP服务。"\r
category: "AI 应用"\r
tags: ["MCP", "通信协议", "Json-RPC", "FastMCP", "AI集成"]\r
author: "adventure"\r
readingTime: "12分钟"\r
slug: "mcp-protocol-guide"\r
---\r
\r
# 知识学习\r
\r
## 为什么需要mcp\r
\r
MCP（Model Context Protocol）是一个协议规范，是对模型、client、server 三者之间如何通信的统一协议\r
\r
如果没有类似 MCP 的协议，我们将需要创建 M×N 个自定义集成——为 AI 应用与外部能力的每一种可能组合创建一个（使用function-calling）。\r
![](../../assets/images/image-11.png)\r
\r
计算机领域的任何问题都可以通过增加一个间接的中间层来解决\r
\r
这里加一个mcp-host作为中间层，形成这样的结构\r
\r
![](../../assets/images/image-9.png)\r
\r
有了mcp-host 就降低了对模型的要求，模型可以不支持function-calling，只需要有很强的逻辑执行能力就可以了，模型只需要理解 MCP 格式的 prompt/响应协议，并基于文本（或结构化 JSON）逻辑执行任务，不需要真正调用函数，而工具客户端的调用由MCPClient执行\r
\r
其中**mcp-host** 常见的就是cursor、Claude 、Cherry-studio（~~更适合国内使用~~）里面封装了**mcp-client**的逻辑，可以通过json配置client和mcp-server的连接\r
\r
\r
\r
## 通信协议\r
\r
MCP 定义了一个标准化的通信协议，使客户端和服务器能够以一致、可预测的方式交换消息。这种标准化对于社区间的互操作性至关重要。\r
\r
### Json-rpc\r
\r
下面是json-rpc的结构\r
\r
#### 1. 请求\r
\r
* 一个唯一标识符（ \`id\` ）\r
\r
* 要调用的方法名（例如， \`tools/call\` ）\r
\r
* 该方法参数（如有）\r
\r
* 示例\r
\r
\`\`\`json\r
{\r
  "jsonrpc": "2.0",\r
  "id": 1,\r
  "method": "tools/call",\r
  "params": {\r
    "name": "weather",\r
    "arguments": {\r
      "location": "San Francisco"\r
    }\r
  }\r
}\r
\`\`\`\r
\r
#### 2. 响应\r
\r
从服务器发送给客户端以回复请求。响应消息包括：\r
\r
* 与相应请求相同的 \`id\`\r
\r
* \`result\` （成功）或 \`error\` （失败）\r
\r
成功响应：\r
\r
\`\`\`json\r
{\r
  "jsonrpc": "2.0",\r
  "id": 1,\r
  "result": {\r
    "temperature": 62,\r
    "conditions": "Partly cloudy"\r
  }\r
}\r
\`\`\`\r
\r
失败响应：\r
\r
\`\`\`json\r
{\r
  "jsonrpc": "2.0",\r
  "id": 1,\r
  "error": {\r
    "code": -32602,\r
    "message": "Invalid location parameter"\r
  }\r
}\r
\`\`\`\r
\r
#### 3. 通知\r
\r
单向消息，无需回复。通常由服务器发送给客户端，以提供有关事件的更新或通知。\r
\r
\`\`\`json\r
{\r
  "jsonrpc": "2.0",\r
  "method": "progress",\r
  "params": {\r
    "message": "Processing data...",\r
    "percent": 50\r
  }\r
}\r
\`\`\`\r
\r
### 传输机制\r
\r
#### Stdio （标准输入/输出）\r
\r
stdio 传输用于本地通信，即客户端和服务器运行在同一台机器上：\r
\r
* 主机应用程序作为子进程启动服务器，并通过向其标准输入（stdin）写入以及从其标准输出（stdout）读取来与其通信。\r
\r
\r
\r
#### HTTP + SSE (服务器发送事件) / 可流式传输的 HTTP\r
\r
HTTP+SSE 传输用于远程通信，客户端和服务器可能位于不同的机器上：\r
\r
\r
\r
这里贴一个npm包，可以实现stdio和sse的互相转换\r
\r
> Supergateway可以通过一条命令在SSE（服务器端事件）或WebSockets（WS）上运行基于MCP stdio的服务器。这对于远程访问、调试或连接到仅支持stdio的MCP服务器上的客户端非常有用。\r
\r
mcp目前提供了三种方式的服务 stdio、sse 、streamable-http\r
\r
下面快速介绍一下这三种方式的区别\r
\r
* mcp-server目前有两种形式，一种是对外直接提供服务的，可以直接通过sse的url进行通信，另一种是需要本地启动服务的，通过stdio或者发布成服务进行开放\r
\r
* 在modelscope可以通过查看mcp后面的hosted（为直接提供服务的）和local（需要本地部署）\r
\r
# 1. 环境要求\r
\r
* 如果要下载第三方提供的mcp服务建议安装\r
\r
- [ ] 安装node.js&#x20;\r
\r
- [ ] 安装uvx\r
\r
选择使用客户端的方式进行测试，下载[Cherry Studio](https://cherrystudiocn.com/)\r
\r
# 2. 配置\r
\r
在下面的模型服务中添加自己的平台及api-key\r
\r
![](/page/assets/images/image-10.png)\r
\r
进行mcp-server配置\r
\r
![](/page/assets/images/image-5.png)\r
\r
导入下面的json\r
\r
\`\`\`json\r
{\r
  "mcpServers": {\r
    "filesystem": {\r
      "name": "filesystem",\r
      "type": "stdio",\r
      "isActive": true,\r
      "registryUrl": "",\r
      "command": "npx",\r
      "args": [\r
        "-y",\r
        "@modelcontextprotocol/server-filesystem",\r
        "D:\\\\download\\\\test"\r
      ]\r
    }\r
  }\r
}\r
\`\`\`\r
\r
上面参数是在本地通过node启动了一个本地服务\r
\r
开启mcp服务器（上面服务采用默认的stdio通信，即本地进程通信）\r
\r
在对话的设置中的助手设置开启模型的mcp服务\r
\r
![](/page/assets/images/image-8.png)\r
\r
# 3. 测试\r
\r
![](/page/assets/images/image-7.png)\r
\r
![](/page/assets/images/image-4.png)\r
\r
# 4. 编写mcp-server\r
\r
\`\`\`bash\r
# 下载fastmcp\r
pip install fastmcp\r
\`\`\`\r
\r
代码如下\r
\r
\`\`\`python\r
from pathlib import Path\r
from fastmcp import Context\r
from fastmcp import FastMCP,Client\r
import asyncio\r
mcp = FastMCP("getPersonInfo",port=8888)\r
import pandas as pd\r
from fastmcp.resources import *\r
@mcp.tool()\r
def getPersonInfo(ctx: Context | None = None) ->str|None:\r
    """返回所有的人员的个人信息（返回Markdown）\r
    输入：无\r
    输出：md_tabel (输出所有的人员的个人信息（markdown表格形式)\r
    """\r
    path=r"D:\\pycharm\\mcp\\demo1\\person.xlsx"\r
    df = pd.read_excel(path)\r
    md_table = df.to_markdown()  # 不保留行索引\r
    return md_table\r
@mcp.tool()\r
def getOrderInfo(ctx: Context | None = None) ->str|None:\r
    """返回所有的菜品的相关信息（返回Markdown）\r
    输入：无\r
    输出：md_tabel (输出所有的菜的信息（markdown表格形式)\r
    """\r
    path=r"D:\\pycharm\\mcp\\demo1\\order.xlsx"\r
    df = pd.read_excel(path)\r
    md_table = df.to_markdown()  # 不保留行索引\r
    return md_table\r
def main():\r
    mcp.run()\r
\r
if __name__ == "__main__":\r
   #mcp.run()\r
    mcp.run(transport='streamable-http')\r
\`\`\`\r
\r
运行上面代码并通过[ngork](https://dashboard.ngrok.com/)开放到公网\r
\r
\`\`\`bash\r
python demo.py\r
ngrok http http://localhost:8888\r
\`\`\`\r
\r
# 5. 使用dify测试\r
\r
在dify中选择agent支持mcp的策略\r
\r
mcp配置如下\r
\r
\`\`\`json\r
{\r
  "getPersonInfo": {\r
    "transport": "streamable_http",\r
"headers": {"Content-Type": "application/json"}, \r
    "url": "https://c6e6-49-74-111-140.ngrok-free.app/mcp/"\r
  }\r
}\r
\`\`\`\r
\r
dify在新版本中对Streamable HTTP通信增加了对响应的headers中Content-Type的判断，否则无法确定返回的响应是json字符串还是event字符串\r
\r
添加了请求体的类型仍有报错如下\r
\r
![](/page/assets/images/image-6.png)\r
\r
fastmcp的sdk导致的\r
\r
![](/page/assets/images/image-3.png)\r
\r
将url改为/mcp/\r
\r
![](/page/assets/images/image-2.png)\r
\r
进行测试\r
\r
![](/page/assets/images/image-1.png)\r
\r
> 新版本的dify 添加了对mcp的resource 和template的支持（未测试）\r
\r
# PS:MCP（需要local运行并且运行模式为stdio）转为sse/http\r
\r
很多平台提供了众多mcp-server，我们使用npm/uv 运行，但是部分只支持stdio，这样我们的一些平台就不能使用我们的mcp（如dify），这里可以使用supergate 转化一下\r
\r
[文件系统](https://www.modelscope.cn/mcp/servers/@modelcontextprotocol/filesystem) 这是一个local mcp&#x20;\r
\r
\`\`\`json\r
{\r
  "mcpServers": {\r
    "filesystem": {\r
      "command": "npx",\r
      "args": [\r
        "-y",\r
        "@modelcontextprotocol/server-filesystem",\r
        "/Users/username/Desktop",\r
        "/path/to/other/allowed/dir"\r
      ]\r
    }\r
  }\r
}\r
\`\`\`\r
\r
这是他提供的 启动配置\r
\r
我们可以通过下面方式使其通过sse 方式启动（[supergateway](https://github.com/supercorp-ai/supergateway#readme) 启动）\r
\r
\`\`\`bash\r
npx -y supergateway     --stdio "npx -y @modelcontextprotocol/server-filesystem  D:\\gemini-cli\\test"     --port 8000     --ssePath /sse\r
\`\`\`\r
\r
只需要根据需要更改引号内的mcp 服务即可\r
\r
![](/page/assets/images/image.png)\r
\r
sse的节点在\`http://localhost:8000/sse\`\r
\r
之后进行内网穿透即可\r
\r
`;export{r as default};
//# sourceMappingURL=lear_mcp-n6PaV_iz.js.map
