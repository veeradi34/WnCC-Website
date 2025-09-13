import React from "react";
import { 
    Code, 
    Github, 
    GitBranch, 
    Users, 
    Star, 
    MessageCircle, 
    Zap,
    BookOpen
} from "lucide-react";
import Card from "../common/Card";

const HelloFOSS = () => {
    const fossBenefits = [
        { 
            title: "Learn Real-World Skills", 
            icon: <Code className="w-6 h-6 text-cyan-400" />,
            description: "Work on real projects used by people around the world and gain practical experience."
        },
        { 
            title: "Build Your Portfolio", 
            icon: <GitBranch className="w-6 h-6 text-cyan-400" />,
            description: "Create a public portfolio of contributions that showcases your skills to potential employers."
        },
        { 
            title: "Join a Community", 
            icon: <Users className="w-6 h-6 text-cyan-400" />,
            description: "Become part of supportive communities that help you grow as a developer."
        },
        {
            title: "Win Recognition & Prizes", 
            icon: <Star className="w-6 h-6 text-cyan-400" />,
            description: "Outstanding contributions will be recognized with awards at the end of the event."
        }
    ];

    const previousProjects = [
        {
            name: "Hello-FOSS-SOC-Portal",
            description: "A portal for Season of Code (SOC) to manage projects, applications, and mentorships for open-source initiatives.",
            tags: ["JavaScript", "React", "Node.js", "Express"],
            difficulty: "Intermediate",
            repoLink: "https://github.com/wncc/Hello-FOSS-SOC-Portal"
        },
        {
            name: "ML Diffusivity",
            description: "A generative AI toolkit focusing on diffusion models and their applications.",
            tags: ["Python", "PyTorch", "Machine Learning"],
            difficulty: "Advanced",
            repoLink: "https://github.com/wncc/Hello-FOSS-ML-Diffusivity"
        },
        {
            name: "PyThread.cpp",
            description: "Parallel computing library that optimizes multi-threaded operations in Python.",
            tags: ["C++", "Python", "Parallel Computing"],
            difficulty: "Advanced",
            repoLink: "https://github.com/wncc/Hello-Foss-PyThread.cpp"
        }
    ];

    return (
      <div className="space-y-12 py-8">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            <h1 className="text-5xl font-bold">Hello FOSS 2025</h1>
          </div>
          <div className="flex justify-center items-center mb-4">
            <span className="bg-cyan-500/20 text-cyan-400 px-4 py-1 rounded-full text-sm font-semibold">
              October 1 - 31, 2025
            </span>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            WnCC's flagship month-long program that introduces Free and Open
            Source Software to beginners while advancing the skills of
            experienced contributors. Join us at IIT Bombay for a transformative
            open-source journey!
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://github.com/wncc"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
            >
              <Github className="w-5 h-5" /> Join Us on GitHub
            </a>

            <a
              href="/contact"
              className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
            >
              <MessageCircle className="w-5 h-5" /> Get in Touch
            </a>
          </div>
        </section>

        {/* About Hello FOSS 2025 */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">
            About <span className="text-cyan-400">Hello FOSS 2025</span>
          </h2>
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-6 text-gray-300">
            <p className="text-lg mb-4">
              WnCC, a student-led body, is hosting their annual Hello FOSS event
              between October 1–31, 2025 at IIT Bombay. It is WnCC's flagship
              month-long program that introduces Free and Open Source Software
              to beginners while advancing the skills of experienced
              contributors.
            </p>
            <p className="text-lg">
              The event features mentor support, and prizes recognizing
              outstanding contributions and community leadership.
            </p>
          </div>
        </section>

        {/* Two Tracks Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">
            Two <span className="text-cyan-400">Tracks</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-green-500">
              <h3 className="text-xl font-semibold text-green-400 mb-4">
                Beginner Track
              </h3>
              <p className="text-gray-300">
                Perfect for newcomers to open source. This track focuses on the
                fundamentals of Git, GitHub, and the open source contribution
                workflow. You'll be guided through your first pull requests and
                learn how to effectively participate in open source communities.
              </p>
              <div className="mt-4 flex items-center gap-2 text-green-500">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">
                  No prior experience required
                </span>
              </div>
            </Card>
            <Card className="border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                Advanced Track
              </h3>
              <p className="text-gray-300">
                Designed for those who already have some open source experience.
                This track challenges you with more complex projects and deeper
                contributions. You'll work on feature implementations, bug
                fixes, and collaborate closely with project maintainers.
              </p>
              <div className="mt-4 flex items-center gap-2 text-blue-500">
                <Code className="w-5 h-5" />
                <span className="font-semibold">
                  For experienced contributors
                </span>
              </div>
            </Card>
          </div>
        </section>

        {/* What is FOSS Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">
            What is <span className="text-cyan-400">FOSS</span>?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                Free and Open Source Software
              </h3>
              <p className="text-gray-300">
                FOSS stands for Free and Open Source Software. It refers to
                software that users are free to use, study, modify, and
                distribute without legal restrictions. The source code is
                available to everyone, allowing collaborative development and
                improvement.
              </p>
              <div className="mt-4 flex items-center gap-2 text-cyan-500">
                <BookOpen className="w-5 h-5" />
                <a href="https://opensource.guide/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Learn more about open source
                </a>
              </div>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                Why Contribute?
              </h3>
              <p className="text-gray-300">
                Contributing to open source projects is not just about helping
                the community. It's about learning, growing, and building skills
                that are valued in the industry. It's also a great way to
                network with professionals and like-minded individuals.
              </p>
              <div className="mt-4">
                <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg">
                  <span className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    <span>10,000+ students participated globally</span>
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">
            Benefits of <span className="text-cyan-400">Contributing</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fossBenefits.map((benefit, index) => (
              <Card
                key={index}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="p-4 rounded-full bg-gray-800 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-300">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Previous Projects Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">
            Previous <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {previousProjects.map((project, index) => (
              <Card key={index} className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-cyan-400">
                    {project.name}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      project.difficulty === "Beginner"
                        ? "bg-green-500/20 text-green-400"
                        : project.difficulty === "Intermediate"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {project.difficulty}
                  </span>
                </div>
                <p className="text-gray-300 mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-700 text-gray-300 px-2 py-1 text-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end items-center mt-auto pt-4 border-t border-gray-700">
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <Github className="w-4 h-4" />
                    Repository
                  </a>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <a
              href="https://github.com/wncc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg transition-all"
            >
              <Zap className="w-5 h-5" /> View All Projects
            </a>
          </div>
        </section>

        {/* Event Timeline */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">
            Event <span className="text-cyan-400">Timeline</span>
          </h2>
          <div className="relative py-8">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-blue-500"></div>

            <div className="relative flex items-center mb-12">
              <div className="w-1/2 pr-12 text-right">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-cyan-500/20">
                  <h3 className="text-xl font-bold text-cyan-400">
                    September 21, 2025
                  </h3>
                  <p className="text-gray-300">Registration Begins</p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full"></div>
              <div className="w-1/2 pl-12"></div>
            </div>

            <div className="relative flex items-center mb-12">
              <div className="w-1/2 pr-12"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full"></div>
              <div className="w-1/2 pl-12">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-cyan-500/20">
                  <h3 className="text-xl font-bold text-cyan-400">
                    September 26, 2025
                  </h3>
                  <p className="text-gray-300">
                    Git101: An Introduction to GitHub
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center mb-12">
              <div className="w-1/2 pr-12 text-right">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-cyan-500/20">
                  <h3 className="text-xl font-bold text-cyan-400">
                    September 27, 2025
                  </h3>
                  <p className="text-gray-300">
                    Orientation and Track Selection
                  </p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full"></div>
              <div className="w-1/2 pl-12"></div>
            </div>

            <div className="relative flex items-center mb-12">
              <div className="w-1/2 pr-12"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full"></div>
              <div className="w-1/2 pl-12">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-cyan-500/20">
                  <h3 className="text-xl font-bold text-cyan-400">
                    October 1-31, 2025
                  </h3>
                  <p className="text-gray-300">Active Contribution Period</p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center">
              <div className="w-1/2 pr-12 text-right">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-cyan-500/20">
                  <h3 className="text-xl font-bold text-cyan-400">
                    October 31, 2025
                  </h3>
                  <p className="text-gray-300">Closing Ceremony & Awards</p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full"></div>
              <div className="w-1/2 pl-12"></div>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Hello FOSS 2025
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Whether you're a beginner or an experienced developer, Hello FOSS
            has a track for you. Register now to be part of this exciting
            month-long journey into open source!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
              <Github className="w-5 h-5" /> Register Now
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
              <BookOpen className="w-5 h-5" /> Event Guidelines
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
              <Users className="w-5 h-5" /> Join Discord Community
            </button>
          </div>
        </section>
      </div>
    );
};

export default HelloFOSS;
