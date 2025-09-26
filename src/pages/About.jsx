import { motion } from 'framer-motion'
import { 
  Mail, 
  Github, 
  Twitter, 
  Linkedin, 
  Code, 
  BookOpen, 
  Coffee,
  Award,
  Briefcase,
  MapPin,
  Calendar,
  User,
  BookOpen as BookMarked
} from 'lucide-react'

const About = () => {
  const skills = [
    { name: 'Python & Go', level: 95, category: '编程与工程基础' },
    { name: 'Git & Docker', level: 88, category: '开发工具与运维' },
    { name: 'PyTorch & vLLM', level: 90, category: '深度学习与大模型' },
    { name: 'Qwen/GPT', level: 85, category: '生成式模型应用' },
    { name: 'ASR/TTS', level: 85, category: '语音建模' },
    { name: '分布式训练与并行计算', level: 80, category: '分布式与优化' },
    { name: 'RLHF/PPO/DPO', level: 75, category: '强化学习与模型对齐' },
    { name: 'MCP & RAG', level: 80, category: '上下文协议与工作流' },
  ]

  const experiences = [
    {
      title: '大模型算法实习生',
      company: '南京中科逆熵科技有限公司',
      period: '2025.4 - 至今',
      description: '负责大模型基于思元MLU的训练、推理、部署等。'
    }
  ]

  const achievements = [
  ]

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/advanture917', label: 'GitHub' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://x.com/adventure_917', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:2829777585@qq.com', label: 'Email' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <User className="w-16 h-16" />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-primary-600 px-4 py-1 rounded-full text-sm font-medium">
                AI 开发工程师
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              关于我
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              希望能在AI/web3领域有更深入的理解和实践，为技术社区贡献力量。
            </p>
            
            <div className="flex justify-center space-x-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-white/30 dark:hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                我的故事
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              我是一名大四在读学生，对人工智能与Web3有着浓厚兴趣。
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              我的技术栈涵盖机器学习、大模型训练与应用，以及后端开发。
              我正在不断探索如何将AI与Web3等前沿技术结合，应用到实际场景中。
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              这里记录自己的学习经历、项目经历、技术博客等。
              希望能为技术社区贡献力量，并与更多开发者交流成长。
            </p>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>南京，中国</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-5 h-5" />
                <span>在校大四</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <BookMarked className="w-5 h-5" />
                  <span>小说追更人</span>
              </div>
            </div>

            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                技术专长
              </h3>
              
              <div className="space-y-4">
                {skills.slice(0, 6).map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-primary-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              工作经历
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              从初级开发者到高级工程师的成长历程
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-start space-x-6 mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className={`flex-1 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>
                    <div className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                      {exp.company}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                      {exp.period}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              技能栈
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              掌握多种技术，能够独立完成全栈项目开发
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full"
                  />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {skill.category}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              成就与贡献
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              在技术社区中的贡献和获得的认可
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center space-y-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto text-primary-600 dark:text-primary-400">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              让我们一起创造精彩
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              如果你对 AI 应用或 Web3 方向感兴趣，欢迎与我交流。
              我期待与志同道合的伙伴一起探索属于我们的“星辰大海”。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:2829777585@qq.com"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                <Mail className="w-5 h-5 mr-2" />
                发送邮件
              </a>
              
              <a
                href="https://github.com/advanture917"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/30 transition-colors duration-200"
              >
                <Github className="w-5 h-5 mr-2" />
                查看GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About