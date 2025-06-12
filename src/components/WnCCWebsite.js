import React, { useState, useEffect, useRef } from "react";

import {
    Code,
    Laptop,
    Cpu,
    GitBranch,
    Trophy,
    Star,
    Sparkles,
    Users,
    Calendar,
    Lightbulb,
    BookOpen,
    UserCheck,
    MessageCircle,
    Github,
    Twitter,
    Linkedin,
    Activity,
    Instagram,
    Award,
    Zap,
    Brain,
    Globe,
    MousePointer,
    Sparkles as SparklesIcon,
    X,
    Search,
    Newspaper,
    ArrowRight,
    Braces,
    Lock,
    Smartphone,
    Binary,
    Server,
    Terminal,
    Database,
    Code2,
    Link
} from "lucide-react";

import axios from 'axios';

// Card component for consistent styling
const Card = ({ children, className = "", onMouseEnter, onMouseLeave }) => (
    <div
        className={`bg-gray-800/50 backdrop-blur p-6 rounded-xl border border-cyan-500/20 transition-all duration-300 hover:shadow-lg hover:border-cyan-500/40 ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {children}
    </div>
);
const generateCalendarUrl = (event) => {
    const encodedText = encodeURIComponent(event.title);
    const encodedDetails = encodeURIComponent(event.description);
    const encodedLocation = encodeURIComponent(event.location);
    const startDate = new Date(event.date)
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(event.endDate)
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "");

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedText}&details=${encodedDetails}&location=${encodedLocation}&dates=${startDate}/${endDate}`;
};
const TechNewsFeed = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndCacheNews = async () => {
            try {
                // Check if we have cached news and if it's still valid (less than 24 hours old)
                const cachedData = localStorage.getItem('techNewsCache');
                const cachedTimestamp = localStorage.getItem('techNewsCacheTimestamp');
                const now = new Date().getTime();

                if (cachedData && cachedTimestamp) {
                    const timeDiff = now - parseInt(cachedTimestamp);
                    const hoursElapsed = timeDiff / (1000 * 60 * 60);

                    // If cache is less than 24 hours old, use it
                    if (hoursElapsed < 24) {
                        setNews(JSON.parse(cachedData));
                        setLoading(false);
                        return;
                    }
                }

                // If no cache or cache is old, fetch new data
                const response = await axios.get(
                    'https://gnews.io/api/v4/search', {
                    params: {
                        q: 'technology',
                        lang: 'en',
                        country: 'us',
                        max: 10,
                        apikey: 'd506df354490ba89a3d579e4d84dd826'
                    }
                }
                );

                const formattedNews = response.data.articles.map(article => ({
                    title: article.title,
                    date: new Date(article.publishedAt).toLocaleDateString(),
                    category: 'Tech',
                    description: article.description,
                    url: article.url
                }));

                // Cache the new data
                localStorage.setItem('techNewsCache', JSON.stringify(formattedNews));
                localStorage.setItem('techNewsCacheTimestamp', now.toString());

                setNews(formattedNews);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('Failed to fetch news');
                setLoading(false);

                // Try to use cached data even if it's old when API fails
                const cachedData = localStorage.getItem('techNewsCache');
                if (cachedData) {
                    setNews(JSON.parse(cachedData));
                } else {
                    // Fallback to sample news if no cache and API fails
                    setNews([
                        {
                            title: "Error fetching live news",
                            date: "Now",
                            category: "System",
                            description: "Please check your API key and connection. Displaying sample news as fallback.",
                            url: "#"
                        }
                    ]);
                }
            }
        };

        fetchAndCacheNews();

        // Set up periodic check for cache age
        const checkCacheInterval = setInterval(() => {
            const cachedTimestamp = localStorage.getItem('techNewsCacheTimestamp');
            const now = new Date().getTime();

            if (cachedTimestamp) {
                const timeDiff = now - parseInt(cachedTimestamp);
                const hoursElapsed = timeDiff / (1000 * 60 * 60);

                // If cache is more than 24 hours old, fetch new data
                if (hoursElapsed >= 24) {
                    fetchAndCacheNews();
                }
            }
        }, 1000 * 60 * 60); // Check every hour

        // Also check when tab becomes visible
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                const cachedTimestamp = localStorage.getItem('techNewsCacheTimestamp');
                const now = new Date().getTime();

                if (cachedTimestamp) {
                    const timeDiff = now - parseInt(cachedTimestamp);
                    const hoursElapsed = timeDiff / (1000 * 60 * 60);

                    if (hoursElapsed >= 24) {
                        fetchAndCacheNews();
                    }
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup
        return () => {
            clearInterval(checkCacheInterval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (news.length === 0) return;

        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % news.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [news.length]);

    const handleReadMore = (url) => {
        window.open(url, '_blank');
    };

    if (loading) {
        return (
            <Card className="p-6 bg-gray-900/50 backdrop-blur border-cyan-500/20">
                <div className="flex items-center justify-center h-48">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6 bg-gray-900/50 backdrop-blur border-cyan-500/20">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <Newspaper className="w-5 h-5" />
                Tech News Feed
            </h3>
            <div className="relative overflow-hidden h-48">
                {news.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transform transition-all duration-500 ${index === activeIndex
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-full opacity-0'
                            }`}
                    >
                        <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-sm">
                            {item.category}
                        </span>
                        <h4 className="text-lg font-semibold text-white mt-2 mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-sm mb-2">{item.date}</p>
                        <p className="text-gray-300 line-clamp-2">{item.description}</p>
                        <button
                            onClick={() => handleReadMore(item.url)}
                            className="mt-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            Read More <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
                {news.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex
                            ? 'bg-cyan-400 w-4'
                            : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                    />
                ))}
            </div>
        </Card>
    );
};

const ParticleEffect = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const particles = [];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.speed = 0.5;
                this.size = Math.random() * 2;
            }

            update() {
                this.y -= this.speed;
                if (this.y < 0) {
                    this.y = canvas.height;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.fillStyle = "rgba(103, 232, 249, 0.5)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        />
    );
};

// Stats component for HomePage
const StatsCounter = ({ label, endValue, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;

            if (progress < 1) {
                setCount(Math.floor(endValue * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(endValue);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [endValue, duration]);

    return (
        <div className="text-center p-4">
            <div className="text-4xl font-bold text-cyan-400 mb-2">{count}+</div>
            <div className="text-gray-300">{label}</div>
        </div>
    );
};
const LiveCodeEditor = () => {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [isLoading, setIsLoading] = useState(false);
    const [pyodide, setPyodide] = useState(null);

    // Default starter code for each language
    const starterCode = {
        javascript:
            '// Try this JavaScript code:\nconsole.log("Hello World!");\n\n// Or try a function:\nfunction greet(name) {\n  return `Hello ${name}!`;\n}\n\nconsole.log(greet("Developer"));',
        python:
            '# Try this Python code:\nprint("Hello World!")\n\n# Or try some calculations:\ndef factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n-1)\n\nprint(f"Factorial of 5 is {factorial(5)}")',
        cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello World!" << std::endl;\n    \n    // Calculate factorial\n    int n = 5;\n    int factorial = 1;\n    for(int i = 1; i <= n; i++) {\n        factorial *= i;\n    }\n    std::cout << "Factorial of 5 is " << factorial << std::endl;\n    return 0;\n}',
    };

    // Initialize code with starter code
    useEffect(() => {
        setCode(starterCode[language]);
    }, [language]);

    // Initialize Pyodide
    useEffect(() => {
        const loadPyodide = async () => {
            if (language === "python" && !pyodide) {
                try {
                    const script = document.createElement("script");
                    script.src =
                        "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
                    script.async = true;
                    document.body.appendChild(script);

                    script.onload = async () => {
                        const pyodideInstance = await window.loadPyodide({
                            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
                        });
                        setPyodide(pyodideInstance);
                    };
                } catch (err) {
                    console.error("Failed to load Pyodide:", err);
                    setOutput("Error: Failed to load Python runtime");
                }
            }
        };

        loadPyodide();
    }, [language]);

    // Execute code based on language
    const executeCode = async () => {
        setIsLoading(true);
        setOutput("");

        try {
            switch (language) {
                case "javascript":
                    await executeJavaScript();
                    break;
                case "python":
                    await executePython();
                    break;
                case "cpp":
                    await executeCPP();
                    break;
            }
        } catch (err) {
            setOutput(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // JavaScript execution in sandbox
    const executeJavaScript = async () => {
        const originalConsoleLog = console.log;
        let output = [];

        try {
            console.log = (...args) => {
                output.push(
                    args
                        .map((arg) =>
                            typeof arg === "object" ? JSON.stringify(arg) : String(arg)
                        )
                        .join(" ")
                );
            };

            const sandbox = new Function("console", code);

            sandbox({ log: console.log });
            setOutput(output.join("\n"));
        } finally {
            console.log = originalConsoleLog;
        }
    };

    // Python execution using Pyodide
    const executePython = async () => {
        if (!pyodide) {
            setOutput("Python runtime is still loading... Please wait.");
            return;
        }

        try {
            pyodide.runPython(`
        import sys
        import io
        sys.stdout = io.StringIO()
      `);

            await pyodide.runPythonAsync(code);
            const stdout = pyodide.runPython("sys.stdout.getvalue()");
            setOutput(stdout);
        } catch (err) {
            setOutput(`Python Error: ${err.message}`);
        }
    };

    // C++ execution (placeholder)
    const executeCPP = async () => {
        try {
            setOutput(
                "C++ compilation is being implemented. This is a placeholder output."
            );
        } catch (err) {
            setOutput(`C++ Error: ${err.message}`);
        }
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-cyan-400">Live Code Editor</h3>
                <div className="flex gap-2">
                    <select
                        value={language}
                        onChange={(e) => {
                            setLanguage(e.target.value);
                            setCode(starterCode[e.target.value]);
                            setOutput("");
                        }}
                        className="px-3 py-1 bg-gray-700 text-cyan-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                    </select>
                    <button
                        onClick={() => setCode(starterCode[language])}
                        className="px-3 py-1 bg-gray-700 rounded text-sm text-cyan-400 hover:bg-gray-600"
                    >
                        Reset
                    </button>
                </div>
            </div>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-gray-900 text-cyan-400 font-mono p-4 rounded mb-4 h-32 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                spellCheck="false"
            />
            <button
                onClick={executeCode}
                disabled={isLoading || (language === "python" && !pyodide)}
                className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
            >
                {isLoading ? "Running..." : "Run Code ▶"}
            </button>
            {output && (
                <div className="mt-4 p-4 bg-gray-900 rounded font-mono">
                    <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
                </div>
            )}
        </div>
    );
};

// Activity Feed component for HomePage
const ActivityFeed = () => {
    const activities = [
        { text: "Season of Code Begins", time: " 21 May" },
        { text: "Launch of DSA Bootcamp", time: "1st June" },
        { text: "Kickoff of the Learners’ Space", time: "9 June" }


    ];

    return (
        <div className="bg-gray-800/50 p-4 rounded-xl">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Recent Activity</h3>
            {activities.map((activity, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3 mb-3 p-2 hover:bg-gray-700/30 rounded"
                >
                    <Activity className="text-cyan-400 w-4 h-4" />
                    <div>
                        <p className="text-white">{activity.text}</p>
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// RiddleGame Component
const RiddleGame = () => {
    const riddles = [
        {
            question:
                "In a room of 23 people, what's the probability that at least two people share the same birthday? (Answer in percentage, rounded to nearest whole number)",
            answer: "51",
        },
        {
            question:
                "You have 8 identical balls, but 1 is slightly heavier. Using a balance scale, what's the minimum number of weighings needed to find the heavier ball?",
            answer: "2",
        },
        {
            question:
                "100 people standing in a circle in an order from 1 to 100. Person 1 has a sword. He kills the next person (2) and gives the sword to the next living person (3). All people do the same until only one survives. Which number lives?",
            answer: "73",
        },
        {
            question:
                "A snail climbs up a 10-foot wall. Each day it climbs up 3 feet, but slides down 2 feet at night. How many days will it take the snail to reach the top?",
            answer: "8",
        },
        {
            question:
                "You have a 5-liter jug and a 3-liter jug. How can you measure exactly 4 liters? Enter the number of steps required.",
            answer: "6",
        },
        {
            question:
                "In binary representation, how many numbers from 1 to 20 (inclusive) have exactly two 1's in their binary form?",
            answer: "6",
        },
        {
            question:
                "A message is encoded by shifting each letter by its position (1st letter shifted by 1, 2nd by 2, etc). 'HAL' becomes 'IBM'. What does 'BUG' become?",
            answer: "DIJ",
        },
        {
            question:
                "On a 3x3 grid, how many unique paths are there from top-left to bottom-right if you can only move right or down?",
            answer: "6",
        },
        {
            question:
                "In an array of integers from 1 to n, one number appears twice while one number is missing. If array sum is 55 and n is 10, what's the duplicate number?",
            answer: "7",
        },
        {
            question:
                "Given a fair coin, what's the expected number of flips needed to get two consecutive heads? (Round to one decimal place)",
            answer: "6",
        },
        {
            question: "How many trailing zeros are in 100 factorial (100!)?",
            answer: "24",
        },
        {
            question:
                "What's the maximum number of pieces you can get by cutting a circular pizza with 6 straight cuts?",
            answer: "22",
        },
        {
            question:
                "If you have 9 coins and one is counterfeit (lighter), minimum number of weighings on a balance scale to find it?",
            answer: "2",
        },
        {
            question:
                "How many different ways can you make change for $1 using standard US coins (1,5,10,25,50 cents)?",
            answer: "292",
        },
        {
            question:
                "In a sorted array of n distinct integers, if array[index] = index for some index, this index is called a magic index. For array [-5,-3,0,3,7], what's the magic index?",
            answer: "3",
        },
    ];

    const [currentRiddle, setCurrentRiddle] = useState(riddles[0]);
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [streak, setStreak] = useState(0);
    const [usedRiddles, setUsedRiddles] = useState(new Set([0]));
    const [showHint, setShowHint] = useState(false);

    const getNextRiddle = () => {
        let availableIndices = Array.from(
            { length: riddles.length },
            (_, i) => i
        ).filter((i) => !usedRiddles.has(i));

        if (availableIndices.length === 0) {
            setUsedRiddles(new Set([0]));
            availableIndices = Array.from({ length: riddles.length }, (_, i) => i);
        }

        const nextIndex =
            availableIndices[Math.floor(Math.random() * availableIndices.length)];
        setCurrentRiddle(riddles[nextIndex]);
        setUsedRiddles((prev) => new Set([...prev, nextIndex]));
        setShowHint(false);
    };

    const checkAnswer = () => {
        if (
            userAnswer.toLowerCase().trim() === currentRiddle.answer.toLowerCase()
        ) {
            setStreak((prev) => prev + 1);
            setFeedback("Correct! 🎉 Get ready for the next question...");
            setUserAnswer("");
            setShowHint(false);
            setTimeout(() => {
                setFeedback("");
                getNextRiddle();
            }, 2000);
        } else {
            setFeedback("Incorrect! Try again 💡");
            setStreak(0);
        }
    };

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-cyan-400">
                    Coding Interview Practice
                </h3>
                <div className="flex gap-4 items-center">
                    <span className="bg-cyan-500/20 px-3 py-1 rounded-full text-cyan-400">
                        Streak: {streak} 🔥
                    </span>
                    <button
                        onClick={() => {
                            setStreak(0);
                            setUserAnswer("");
                            setFeedback("");
                            setShowHint(false);
                            getNextRiddle();
                        }}
                        className="text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-full transition-colors"
                    >
                        Skip
                    </button>
                </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <p className="text-lg text-gray-200">{currentRiddle.question}</p>
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                    className="flex-1 bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Your answer..."
                />
                <button
                    onClick={checkAnswer}
                    className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors"
                >
                    Submit
                </button>
            </div>
            {feedback && (
                <div
                    className={`mt-4 text-center ${feedback.includes("Correct") ? "text-green-400" : "text-cyan-400"
                        }`}
                >
                    {feedback}
                </div>
            )}
        </Card>
    );
};
const FeatureCard = ({ icon: Icon, title, description }) => (
    <Card className="text-center">
        <Icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </Card>
);

// About Us Section
const AboutUs = () => (
    <div className="mt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50 pointer-events-none" />
        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-8">
            About Us
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
            <Card>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Who are we?</h3>
                <p className="text-gray-300">
                    The Web and Coding Club, one of the biggest clubs at IIT Bombay and
                    part of the Institute Technical Council, provides a gateway for
                    students to join the coding community. We offer mentorship and a
                    platform to help students enhance their coding skills, ensuring
                    everyone has the opportunity to learn and develop a passion for
                    coding. The secret to getting ahead is getting started, and we’re here
                    to give every student the right start.
                </p>
            </Card>
            <Card>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Our Mission </h3>
                <p className="text-gray-300">
                    We aim to foster a culture of learning and innovation by empowering
                    students with the skills to excel in web development, competitive
                    coding, open-source contributions, and emerging technologies.
                </p>
            </Card>
            <Card>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Our Vision</h3>
                <p className="text-gray-300">
                    Create an inclusive environment where students collaborate, innovate,
                    and grow together as problem-solvers and developers.
                </p>
            </Card>
        </div>
    </div>
);

const HomePage = () => {
    const [typewriterText, setTypewriterText] = useState("");
    const fullText = "Coders Together Strong";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setTypewriterText(fullText.substring(0, index));
            index++;
            if (index > fullText.length) {
                setTimeout(() => {
                    index = 0;
                }, 2000);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);
    const features = [
        {
            icon: Brain,
            title: "Fast Paced-Courses",
            description:
                "Deep dive into topics like machine learning, Web Development, and more",
        },
        {
            icon: Globe,
            title: "Hackathons",
            description: "Compete with like minded-developers",
        },
        {
            icon: Zap,
            title: "Expert Talk Sessions",
            description: "Quick, intensive tech sessions",
        },
    ];
    return (
        <div className="space-y-12 relative">
            <ParticleEffect />

            <div className="text-center relative">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/20 rounded-full filter blur-3xl" />
                <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-500/20 rounded-full filter blur-3xl max-w-full max-h-full sm:max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-2rem)]" />
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                    WnCC IIT Bombay
                </h1>

                <div className="h-8">
                    <span className="font-mono text-2xl text-cyan-400">
                        {typewriterText}
                        <span className="animate-pulse">_</span>
                    </span>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                <StatsCounter label="SOC 2025 Participation" endValue={1700} />
                <StatsCounter label="Wiki Articles" endValue={110} />
                <StatsCounter label="Github Repos" endValue={80} />
                <StatsCounter label="Years since fomation" endValue={18} />
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <LiveCodeEditor />
                    <ActivityFeed />
                </div>
                <div className="space-y-8">
                    <RiddleGame />
                    <TechNewsFeed />
                </div>
            </div>

            <AboutUs />
        </div>
    );
};
const EventCard = ({ event }) => {
    const [isHovered, setIsHovered] = useState(false);

    const timeUntilEvent = () => {
        const now = new Date();
        const eventDate = new Date(event.date);
        const diff = eventDate - now;

        if (diff < 0) return "Event has passed";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return `${days}d ${hours}h remaining`;
    };

    return (
        <Card
            className="transform transition-all duration-500 hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden rounded-t-xl -mt-6 -mx-6 mb-6">
                <div className="h-48 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                    {event.icon}
                    {isHovered && (
                        <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-sm flex items-center justify-center">
                            <button className="bg-cyan-500 text-white px-6 py-2 rounded-full transform hover:scale-105 transition-transform">
                                Register Now
                            </button>
                        </div>
                    )}
                </div>
                <div className="absolute top-4 right-4 bg-cyan-500/90 text-white px-3 py-1 rounded-full text-sm">
                    {timeUntilEvent()}
                </div>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-2">{event.title}</h3>
            <div className="flex items-center gap-2 text-cyan-300 mb-2">
                <Calendar className="w-4 h-4" />
                {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                })}
            </div>
            <p className="text-gray-300 mb-4">{event.description}</p>

            <div className="flex items-center gap-4 mb-4">
                <span className="text-gray-400 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.participants || " "}
                </span>
                <span className="text-gray-400 flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    {event.prize || "$1000"}
                </span>
            </div>

            <div className="flex gap-2">
                <a
                    href={generateCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-lg hover:bg-cyan-500/30 transition-colors text-cyan-400"
                >
                    <Calendar className="w-4 h-4" />
                    Add to Calendar
                </a>
                <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors ml-auto">
                    Learn More
                </button>
            </div>
        </Card>
    );
};

// Timeline component for EventsPage
const EventTimeline = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const timelineItems = [
        {
            title: "Season Kickoff",
            date: "April 2025",
            description: "The new season kicks off with lots of enthusiasm",
            icon: <Star className="w-6 h-6" />,
            color: "from-green-500 to-emerald-700"
        },
        {
            title: "Seasons of Code",
            date: "May end to July",
            description: "Flagship Event,8 Week-long",
            icon: <Cpu className="w-6 h-6" />,
            color: "from-blue-500 to-indigo-700"
        },
        {
            title: "DSA Bootcamp",
            date: "1st June",
            description: "8-week Journey to master DSA!",
            icon: <Code className="w-6 h-6" />,
            color: "from-purple-500 to-pink-700"
        },
        {
            title: "Learners' Space",
            date: "9th June",
            description: "4-week long | Igniting passion, elevating skills,& unlocking the future of tech!",
            icon: <Code className="w-6 h-6" />,
            color: "from-cyan-500 to-indigo-700"
        }
    ];

    return (
        <div className="relative mt-20">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500/50 to-transparent" />
            {timelineItems.map((item, index) => (
                <div
                    key={index}
                    className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                        }`}
                    onMouseEnter={() => setSelectedEvent(index)}
                    onMouseLeave={() => setSelectedEvent(null)}
                >
                    <div
                        className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}
                    >
                        <div
                            className={`p-6 rounded-xl bg-gradient-to-br ${item.color
                                } transform transition-all duration-300 ${selectedEvent === index ? "scale-105" : ""
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2 justify-end">
                                {item.icon}
                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            </div>
                            <p className="text-gray-200">{item.date}</p>
                            <p className="text-gray-100 mt-2">{item.description}</p>
                        </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div
                            className={`w-4 h-4 rounded-full bg-cyan-400 transition-transform duration-300 ${selectedEvent === index ? "scale-150" : ""
                                }`}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

const EventsPage = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");

    const events = [
        {
            title: 'AI ML Hackathon',
            date: '2025-06-24T20:00:00Z',
            endDate: '2025-06-30T20:30:00Z',
            description: 'One of the biggest Hackathon in collab with  KCDH. ',
            location: 'IIT Bombay Campus',
            icon: <Calendar className="w-16 h-16 text-cyan-400" />,
            category: 'Hackathon',
            participants: '',
            prize: ' To be announced'
        },
        {
            title: 'Coding Circuit',
            date: '2025-07-30T20:00:00Z',
            endDate: '2025-08-30T20:00:00Z',
            description: 'An electrifying, insti-wide contest testing the limits of DSA skills.',
            location: 'IIT Bombay Campus',
            icon: <Laptop className="w-16 h-16 text-cyan-400" />,
            category: 'competition',
            participants: '',
            prize: 'To be announced '
        },
        {
            title: 'Fresher Orientation',
            date: '2025-09-25T00:00:00Z',
            endDate: '2025-09-28T00:00:00Z',
            description: "Insti's oldest tech legacy meets fresh energy — fun coding events, chill scenes, and the biggest club vibe!",
            location: 'IIT Bombay Campus',
            icon: <Lightbulb className="w-16 h-16 text-cyan-400" />,
            category: 'Orientation',
            participants: '',
            prize: ' '
        }
    ];


    const filteredEvents =
        selectedFilter === "all"
            ? events
            : events.filter((event) => event.category === selectedFilter);

    return (
        <div className="space-y-12 relative">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" />

            {/* Hero section */}
            <div className="text-center relative">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-6">
                    Upcoming Events
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Join us for exciting workshops, competitions, and learning experiences
                </p>
            </div>

            {/* Filters */}
            <div className="flex justify-center gap-4">
                {["all", "competition", "workshop", "seminar"].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`px-6 py-2 rounded-full transition-all duration-300 ${selectedFilter === filter
                            ? "bg-cyan-500 text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>

            {/* Events grid */}
            <div className="grid md:grid-cols-3 gap-8">
                {filteredEvents.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>

            {/* Timeline section */}
            <div className="mt-20">
                <h3 className="text-3xl font-bold text-center text-cyan-400 mb-12">
                    Event Timeline
                </h3>
                <EventTimeline />
            </div>
        </div>
    );
};
const ResourcesPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);



    const resources = [
        {
            title: 'Getting Started with Webdev',
            category: 'tutorials',
            difficulty: 'LEVEL::INTERMEDIATE',
            duration: '10 hours',
            author: 'WnCC Team',
            icon: <Code className="w-8 h-8" />,
            color: 'from-purple-500 to-pink-500',
            description: '> Frontend Development\n> React Architecture\n> UI/UX Engineering',
            tags: ['react', 'javascript', 'frontend'],

            link: 'https://github.com/wncc/Web-Development-LS-24'
        },
        {
            title: 'Data Structures and Algorithms',
            category: 'courses',
            difficulty: 'LEVEL::ADVANCED',
            duration: '20 hours',
            author: 'WnCC Team',
            icon: <Brain className="w-8 h-8" />,
            color: 'from-cyan-500 to-blue-500',
            description: '> Algorithm Design\n> Data Structures\n> Problem Solving',
            tags: ['algorithms', 'complexity', 'optimization'],

            link: 'https://github.com/wncc/DSA-LS-24'
        },
        {
            title: 'Machine Learning Projects',
            category: 'projects',
            difficulty: 'LEVEL::ADVANCED',
            duration: '15 hours',
            author: 'WnCC Team',
            icon: <Cpu className="w-8 h-8" />,
            color: 'from-green-500 to-emerald-500',
            description: '> Neural Networks\n> Deep Learning\n> Data Science',
            tags: ['ml', 'python', 'data-science'],

            link: 'https://github.com/wncc/Machine-Learning-LS-24'
        },
        {
            title: 'GANs and Diffusion Models',
            category: 'projects',
            difficulty: 'LEVEL::ADVANCED',
            duration: '10 hours',
            author: 'WnCC Team',
            icon: <Cpu className="w-8 h-8" />,
            color: 'from-orange-500 to-red-500',
            description: '> Generative AI\n> Deep Learning\n> Computer Vision',
            tags: ['ml', 'python', 'data-science'],

            link: 'https://github.com/wncc/Hello-FOSS-ML-Diffusivity'
        },
        {
            title: 'Parallel Programming',
            category: 'projects',
            difficulty: 'LEVEL::INTERMEDIATE',
            duration: '10 hours',
            author: 'WnCC Team',
            icon: <Cpu className="w-8 h-8" />,
            color: 'from-blue-500 to-violet-500',
            description: '> Multi-threading\n> Parallel Algorithms\n> Performance Optimization',
            tags: ['ml', 'python', 'data-science'],

            link: 'https://github.com/wncc/Hello-Foss-PyThread.cpp'
        },
        {
            title: 'C++ Programming',
            category: 'programming',
            difficulty: 'LEVEL::BEGINNER',
            duration: '10 hours',
            author: 'External',
            icon: <Code className="w-8 h-8" />,
            color: 'from-blue-500 to-indigo-500',
            description: '> Basic Syntax\n> Object Oriented Programming\n> STL Library',
            tags: ['cpp', 'programming', 'basics'],

            link: 'https://www.learncpp.com/'
        },
        {
            title: 'Python Programming',
            category: 'programming',
            difficulty: 'LEVEL::BEGINNER',
            duration: '8 hours',
            author: 'External',
            icon: <Code className="w-8 h-8" />,
            color: 'from-yellow-500 to-green-500',
            description: '> Python Basics\n> Data Structures\n> Object-Oriented Python',
            tags: ['python', 'programming', 'basics'],

            link: 'https://docs.python.org/3/tutorial/'
        },

        // Development Resources
        {
            title: 'Web Development',
            category: 'development',
            difficulty: 'LEVEL::INTERMEDIATE',
            duration: '15 hours',
            author: 'Exteral',
            icon: <Globe className="w-8 h-8" />,
            color: 'from-cyan-500 to-blue-500',
            description: '> HTML/CSS\n> JavaScript\n> React Framework',
            tags: ['web', 'frontend', 'development'],

            link: 'https://www.freecodecamp.org/'
        },
        {
            title: 'App Development',
            category: 'development',
            difficulty: 'LEVEL::INTERMEDIATE',
            duration: '20 hours',
            author: 'External',
            icon: <Smartphone className="w-8 h-8" />,
            color: 'from-green-500 to-emerald-500',
            description: '> Android Development\n> iOS Development\n> Cross-Platform',
            tags: ['mobile', 'android', 'ios'],

            link: 'https://developer.android.com/courses'
        },

        // Algorithms & Data Structures
        {
            title: 'Data Structures',
            category: 'algorithms',
            difficulty: 'LEVEL::INTERMEDIATE',
            duration: '12 hours',
            author: 'External',
            icon: <Binary className="w-8 h-8" />,
            color: 'from-purple-500 to-pink-500',
            description: '> Arrays & Linked Lists\n> Trees & Graphs\n> Hash Tables',
            tags: ['dsa', 'algorithms', 'data-structures'],

            link: 'https://www.geeksforgeeks.org/data-structures/'
        },
        {
            title: 'Algorithms',
            category: 'algorithms',
            difficulty: 'LEVEL::ADVANCED',
            duration: '15 hours',
            author: 'External',
            icon: <Brain className="w-8 h-8" />,
            color: 'from-red-500 to-orange-500',
            description: '> Sorting & Searching\n> Dynamic Programming\n> Graph Algorithms',
            tags: ['dsa', 'algorithms', 'problem-solving'],

            link: 'https://cp-algorithms.com/'
        },

        // Tools & Technologies
        {
            title: 'Git & GitHub',
            category: 'tools',
            difficulty: 'LEVEL::BEGINNER',
            duration: '5 hours',
            author: 'External',
            icon: <GitBranch className="w-8 h-8" />,
            color: 'from-orange-500 to-red-500',
            description: '> Version Control\n> Collaboration\n> Open Source',
            tags: ['git', 'github', 'version-control'],

            link: 'https://git-scm.com/book/en/v2'
        },
        {
            title: 'Linux & Shell',
            category: 'tools',
            difficulty: 'LEVEL::INTERMEDIATE',
            duration: '8 hours',
            author: 'External',
            icon: <Terminal className="w-8 h-8" />,
            color: 'from-gray-500 to-gray-700',
            description: '> Command Line\n> Shell Scripting\n> System Administration',
            tags: ['linux', 'shell', 'bash'],

            link: 'https://linuxjourney.com/'
        },

        // Development Tools
        {
            title: 'Docker & Containers',
            category: 'tools',
            difficulty: 'LEVEL::ADVANCED',
            duration: '10 hours',
            author: 'External',
            icon: <Server className="w-8 h-8" />,
            color: 'from-blue-400 to-blue-600',
            description: '> Containerization\n> Docker Compose\n> Deployment',
            tags: ['docker', 'devops', 'containers'],

            link: 'https://docs.docker.com/get-started/'
        },
        {
            title: 'Database Systems',
            category: 'development',
            difficulty: 'LEVEL::INTERMEDIATE',
            duration: '12 hours',
            author: 'External',
            icon: <Database className="w-8 h-8" />,
            color: 'from-green-400 to-emerald-600',
            description: '> SQL Basics\n> Database Design\n> Query Optimization',
            tags: ['sql', 'database', 'backend'],

            link: 'https://www.postgresqltutorial.com/'
        }
    ];


    const ResourceCard = ({ resource }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <Card
                className="group relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={`absolute inset-0 bg-gradient-to-r ${resource.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Cyberpunk-style corner decorations */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-24 h-1 bg-gradient-to-r ${resource.color}`} />
                    <div className={`absolute top-0 right-0 w-1 h-24 bg-gradient-to-b ${resource.color}`} />
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
                    <div className={`absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r ${resource.color}`} />
                    <div className={`absolute bottom-0 left-0 w-1 h-24 bg-gradient-to-b ${resource.color}`} />
                </div>

                <div className="relative p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${resource.color}`}>
                            {resource.icon}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className="font-mono text-sm text-gray-500">
                                {resource.difficulty}
                            </span>
                            <span className="font-mono text-sm text-gray-500">
                                DURATION::{resource.duration}
                            </span>
                        </div>
                    </div>

                    {/* Title with tech decoration */}
                    <div className="relative">
                        <h3 className={`text-2xl font-bold bg-gradient-to-r ${resource.color} text-transparent bg-clip-text`}>
                            {resource.title}
                        </h3>
                        <div className="absolute -left-2 top-1/2 w-1 h-6 -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
                    </div>

                    {/* Author */}
                    <div className="font-mono text-gray-400 text-sm">
                        AUTHOR::{resource.author}
                    </div>

                    {/* Description with terminal style */}
                    <div className="font-mono text-sm text-gray-400 space-y-1">
                        {resource.description.split('\n').map((line, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-cyan-500">{line}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {resource.tags.map((tag, index) => (
                            <span
                                key={index}
                                className={`px-3 py-1 rounded-full bg-gradient-to-r ${resource.color} bg-opacity-10 
                           text-white text-sm font-mono flex items-center gap-2`}
                            >
                                <Braces className="w-3 h-3" />
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Metrics */}


                    {/* Action button */}
                    <button
                        onClick={() => window.open(resource.link, '_blank')}
                        className={`w-full py-2 rounded-lg bg-gradient-to-r ${resource.color} text-white 
                       font-mono flex items-center justify-center gap-2 transition-transform
                       hover:scale-[1.02] active:scale-[0.98]`}
                    >
                        <Github className="w-4 h-4" />
                        Start Learning
                    </button>
                </div>
            </Card>
        );
    };

    return (
        <div className="min-h-screen bg-gray-950 relative">
            {/* Animated circuit-like background */}
            <div className="fixed inset-0 overflow-hidden opacity-20">
                <div className="absolute w-full h-full">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-cyan-500"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: '1px',
                                height: `${Math.random() * 100}px`,
                                opacity: Math.random() * 0.5
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Header with cyberpunk styling */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                                WnCC::RESOURCES_v2.4
                            </h1>
                            <div className="font-mono text-gray-500 flex items-center gap-4">
                                <span>SYS::ACTIVE</span>
                                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                                <span>{currentTime.toLocaleTimeString()}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 font-mono text-sm">
                            <div className="flex items-center gap-2 text-cyan-500">
                                <Activity className="w-4 h-4" />
                                <span>SYSTEM_ONLINE</span>
                            </div>
                            <div className="flex items-center gap-2 text-purple-500">
                                <Lock className="w-4 h-4" />
                                <span>SECURE_CONNECTION</span>
                            </div>
                        </div>
                    </div>

                    {/* Search and Category Filters */}
                    <div className="space-y-4 mb-8">
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="SEARCH_RESOURCES::"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 pl-12 
                         text-white focus:outline-none focus:border-cyan-500 font-mono"
                            />
                            <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
                        </div>

                        {/* Category Buttons */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">

                        </div>
                    </div>
                </div>
            </div>

            {/* Resources Grid */}
            <div className="container mx-auto px-4 pb-12">
                <div className="grid md:grid-cols-2 gap-6">
                    {resources
                        .filter(resource =>
                            (activeCategory === 'all' || resource.category === activeCategory) &&
                            (searchQuery === '' ||
                                resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
                        )
                        .map((resource, index) => (
                            <ResourceCard key={index} resource={resource} />
                        ))}
                </div>
            </div>
        </div>
    );
};


const ChessIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
    >
        <path d="M8 16L10.293 13.707C10.683 13.317 10.183 12.683 9.293 12.293L7 10C6.61 9.61 6.61 8.39 7 8L9.293 5.707C9.683 5.317 10.317 5.317 10.707 5.707L13 8C13.39 8.39 13.39 9.61 13 10L10.707 12.293C10.317 12.683 10.317 13.317 10.707 13.707L13 16" />
        <path d="M16 8L13.707 10.293C13.317 10.683 13.817 11.317 14.707 11.707L17 14C17.39 14.39 17.39 15.61 17 16L14.707 18.293C14.317 18.683 13.683 18.683 13.293 18.293L11 16C10.61 15.61 10.61 14.39 11 14L13.293 11.707C13.683 11.317 13.683 10.683 13.293 10.293L11 8" />
        <circle cx="12" cy="12" r="10" />
    </svg>
);
const TeamPage = () => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [expandedCards, setExpandedCards] = useState({});
    const [typingText, setTypingText] = useState({});

    const teamMembers = [
        {
            name: "Veeraditya Karan Parakh",
            role: "Manager",
            icon: <MessageCircle className="w-12 h-12 text-cyan-400" />,
            bio: "Hello everyone! I'm Veeraditya, a third-year B.Tech student at IIT Bombay, majoring in Energy science and Engineering. I'm currently the Manager of the Web and Coding Club (WnCC), where I lead initiatives, organize coding sessions, and mentor juniors across various technical domains.\n\n I'm a passionate coder who has been exploring the AI/ML domain for quite some time, constantly learning and building along the way. Outside of tech, I enjoy playing chess, football, and table tennis, and love spending time with friends.",
            skills: ["AI/ML", "Web-Dev", "Data Science", "Chess"],

            social: {
                github: "https://github.com/veeradi34",
                twitter: "https://www.instagram.com/veer3_1/",
                linkedin:
                    "https://www.linkedin.com/in/veeraditya-karan-parakh-68a869282/",
                instagram: "https://www.instagram.com/veer3_1?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            },

            imageUrl: "./Images/VEER.jpg",
            chess: {
                rating: 1850,
                lichessUsername: "veer3106",
            },
        },
        {
            name: "Pratyaksh Bhardwaj",
            role: "Manager",
            icon: <MessageCircle className="w-12 h-12 text-cyan-400" />,
            bio: "Hello everyone! I'm Pratyaksh Bhardwaj, a third-year B.Tech student at IIT Bombay, majoring in Metallurgy and Material Science with a minor in Data Science. I'm currently the Manager of the Web and Coding Club, where I lead projects, conduct sessions, and mentor my convenors across various domains.\n\nI'm an enthusiastic coder and was part of the Inter-IIT Tech Contingent in my second year. Outside of tech, I enjoy playing basketball, badminton, and spending time with friends.",
            skills: [
                "Machine Learning ",
                "Web-Dev",
                "C++",
                "Django",
                "React Js",
                "NodeJs",
            ],

            social: {
                github: "https://github.com/Pratyaksh2309",
                twitter:
                    "https://www.instagram.com/pratyaksh._.23?igsh=MXF4emhsaGQ4cXplZw==",
                linkedin:
                    "https://www.linkedin.com/in/pratyaksh-bhardwaj-b2309ar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                instagram: "https://www.instagram.com/pratyaksh._.23?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",

            },

            imageUrl: "./Images/Pratyaksh.jpg",
        },
        {
            name: "Abhishek Upadhya",
            role: "Convener",
            icon: <MessageCircle className="w-12 h-12 text-cyan-400" />,
            bio: "Hello everyone! I'm Abhishek, a second-year B.Tech student in the Electrical Engineering department at IIT Bombay. I currently serve as a Convener of the Web and Coding Club, where I actively contribute to projects and initiatives aimed at fostering a strong coding culture on campus.\n\nI'm passionate about solving real-world problems and understanding how things work at the most fundamental level. I’m also curious about the mechanics of financial markets and how they operate. Outside of tech, I enjoy going on long cycle rides and playing table tennis. I look forward to contributing to the community in meaningful and impactful ways.",
            skills: ["C++", "Java", "Python", "Computer Vision", "Computer Architecture", "Equity Analysis"],
            social: {
                github: "https://github.com/AbhishekU05",
                twitter: "",
                linkedin:
                    "https://in.linkedin.com/in/abhishek-upadhya-647a58257",
                instagram:
                    "https://www.instagram.com/abhisheku05?igsh=MXgxdjcxZWF6cDBsYw==",
            },
            imageUrl: "./Images/ABHISHEK.png",
        },
        {
            name: "Aashna Pulla",
            role: "Convener",
            icon: <MessageCircle className="w-12 h-12 text-cyan-400" />,
            bio: "Hey everyone! I'm Aashna Pulla, a second-year Computer Science student at IIT Bombay. I'm also a Convener at the Web and Coding Club, where I help run workshops, plan events, and keep the coding culture on campus alive and buzzing.\n\n Outside the tech space, I’m into badminton and absolutely love escape rooms—I’ll take any chance I get to go for one! In my downtime, you’ll probably find me playing the guitar, watching anime, or catching up on sleep (the most underrated hobby ever, honestly).",
            skills: ["Machine Learning", "Computer Vision", "DSA", "C++"],
            social: {
                github: "https://github.com/aashnapulla",
                twitter: "",
                linkedin: "https://www.linkedin.com/in/aashna-pulla-26b8b7334/",
                instagram: "https://www.instagram.com/aashna.p0911/"
            },
            imageUrl: "./Images/AASHNA.png",
        },

        {
            name: "Mrigank Goel",
            role: "Convener",
            icon: <MessageCircle className="w-12 h-12 text-cyan-400" />,
            bio: "Hello everyone! I'm Mrigank Goel, a second-year B.Tech student in Computer Science and Engineering at IIT Bombay. I'm currently a Convener at the Web and Coding Club, where I collaborate on diverse technical projects, help organize sessions, and contribute towards building a strong coding culture in our campus.\n\nI have a deep interest in problem-solving and development, and I'm always curious about how tech can make life more efficient and exciting. Beyond the screen, you'll often find me jogging, playing table tennis, listening to music or chilling out with friends. There’s always something new to try, and I’m all in for the ride.",
            skills: ["Machine Learning", "Artificial Intelligence", "Competitive Programming", "C++", "Python"],
            social: {
                github: "https://github.com/MrigankGoel",
                twitter: "",
                linkedin: "https://www.linkedin.com/in/mrigank-goel-327427336?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                instagram: "https://www.instagram.com/mrigank_goel.964/?utm_source=ig_web_button_share_sheet"
            },
            imageUrl: "./Images/MRIGANK.png",
        }
        ,
        {
            name: "Shivansh Niranjan",
            role: "Convener",
            icon: <MessageCircle className="w-12 h-12 text-cyan-400" />,
            bio: "Hey folks, I’m Shivansh Niranjan, a sophomore at IIT Bombay pursuing Energy Science and Engineering. As the Convener of the Web and Coding Club, I actively contribute to various projects, organize sessions, and conduct courses, helping learners clear their doubts.\n\nI'm enthusiastic about exploring diverse technological domains and their integration with fields like entrepreneurship and sustainability. Beyond academics, I enjoy playing cricket, badminton, and sketching. I'm also deeply passionate about sustainability and actively contribute through efforts like tree planting.",
            skills: ["HTML", "CSS", "JavaScript", "React", "Django", "C++", "Python"],
            social: {
                github: "https://github.com/Raghav789-code",
                twitter: "",
                linkedin: "https://www.linkedin.com/in/shivansh-niranjan-71766a1ba",
                instagram: "https://www.instagram.com/shivansh.niranjan.58/?hl=en"
            },
            imageUrl: "./Images/shivansh.jpeg",
        },
        {
            name: "Riddhi Yeola",
            role: "Convener",
            icon: <MessageCircle className="w-12 h-12 text-cyan-400" />,
            bio: "Hello everyone! I'm Riddhi Yeola, a second-year B.Tech student in civil engineering at IIT Bombay. I'm currently a Convener at the Web and Coding Club, where I engage in a variety of technical initiatives, assistant coordinating workshops and events and actively support the development of a vibrant coding community on campus.\n\nI am deeply driven by curiosity of problem solving and development always exploring innovative ways technology can enhance everyday life outside the digital relief I play athletics, basketball and badminton. And I love long drives, trips and trekking.",
            skills: ["Machine Learning (CV,NLP)", "DSA", "C++"],
            social: {
                github: "https://github.com/Riddhiyeola",
                twitter: "",
                linkedin: "https://www.linkedin.com/in/riddhi-yeola-790b03242?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                instagram: "https://www.instagram.com/mrigank_goel.964/?utm_source=ig_web_button_share_sheet"
            },
            imageUrl: "./Images/RIDDHI.png",
        },
        {
            name: "Utkarsh Tanwar",
            role: "Convener",
            icon: <MessageCircle className="w-12 h-12 text-cyan-400" />,
            bio: "Hello everyone! I'm Utkarsh Tanwar,a second-year B.Tech student at IIT Bombayr of the Web and Coding Club, where I contribute to club initiatives, coordinate sessions, and work on exciting tech projects with fellow enthusiasts.\n\nOutside the world of coding, I love swimming, reading, playing badminton and tennis, and trekking through nature. I'm always eager to explore new places and experience the beauty the world has to offer.\n\nLooking forward to connecting and learning together.",
            skills: [
                "Python",
                "C++",
                "JavaScript",
                "Web Development",
                "Machine Learning",
                "Django",
                "Node.js",
                "React.js"
            ],
            social: {
                github: "https://github.com/icodeforlife24",
                twitter: "",
                linkedin: "https://www.linkedin.com/in/utkarsh-tanwar-400b52256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                instagram: "https://www.instagram.com/utkarsh_tanwar77?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            },
            imageUrl: "./Images/UTKARSH.png",
        },
        {
            name: "Avnish Vijay More",
            role: "Convener",
            icon: <MessageCircle className="w-12 h-12 text-cyan-400" />,
            bio: "Hello everyone! I’m Avnish Vijay More, a Civil Engineering undergrad at IIT Bombay and currently serving as a Convener at the Web and Coding Club. I’m passionate about data science, machine learning, and finance, and I thrive on solving real-world challenges through technology and innovation. At the club, I focus on organizing exciting events, collaborating on impactful projects, and nurturing a strong and inclusive coding community on campus.\n\nBeyond the screen, you’ll find me on the football field, vibing to music, or diving into the world of gaming.",
            skills: ["Machine Learning", "Deep Learning", "NLP", "Football"],
            social: {
                github: "https://github.com/wejhdy",
                twitter: "",
                linkedin: "https://www.linkedin.com/in/avnish-more/",
                instagram: "https://www.instagram.com/avn1sh.__/"
            },
            imageUrl: "./Images/AVNISH.png",
        },


        {
            name: "Mithra Bijumon",
            role: "Convener",
            icon: <MessageCircle className="w-12 h-12 text-cyan-400" />,
            bio: "Hello everyone!\n\nI'm Mithra Bijumon, a second-year B.Tech student in Aerospace Engineering at IIT Bombay. I’m currently part of the Web and Coding Club, where I contribute to technical projects, event coordination, and help conduct workshops and design initiatives aimed at making the coding scene on campus more exciting and accessible.\n\nI'm passionate about problem-solving and full-stack development. I love exploring how design and technology intersect to create engaging user experiences, and I'm always up for a new challenge.\n\nOutside the world of code, I find joy in swimming, badminton, and exploring new places. I'm also someone who values independence and loves working hands-on—whether it’s through coding, brainstorming ideas, or just figuring things out solo or with help.",
            skills: ["Machine Learning", "Web Development", "App Development", "Generative AI", "Python", "C++"],
            social: {
                github: "https://github.com/MithraBijumon",
                twitter: "",
                linkedin: "http://www.linkedin.com/in/mithra-bijumon-059104301",
                instagram: "https://www.instagram.com/mithra.bijumon/"
            },
            imageUrl: "./Images/MITHRA.png",
        },
        {
            name: "Nishil Seth Gupta",
            role: "Convener",
            icon: <MessageCircle className="w-12 h-12 text-cyan-400" />,
            bio: "Hello everyone! I'm Nishil, a second-year B.Tech student in the Civil Engineering department at IIT Bombay and currently a Convener at the Web and Coding Club. I’m involved in driving club initiatives, conducting sessions, and collaborating on projects to promote coding in our campus. My primary interest lies in problem-solving. I enjoy building things from scratch, understanding systems deeply, and sharing that process with others. Outside of tech, I’m a passionate singer, play the guitar, and often spend time painting. I'm always open to new ideas, new people, and new challenges—and I look forward to contributing to the community in meaningful ways.",
            skills: ["C++", "Python", "DSA", "Design"],
            social: {
                github: "https://github.com/Nishil-the-seth",
                twitter: "",
                linkedin: "https://www.linkedin.com/in/verynise/",
                instagram: "https://www.instagram.com/the.nishil.the.seth?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            },
            imageUrl: "./Images/NISHIL.png",
        },
        {
            name: "Sarthak Somani",
            role: "Convener",
            icon: <MessageCircle className="w-12 h-12 text-cyan-400" />,
            bio: "Hello, Sarthak Somani here! I'm from Bangalore and am currently pursuing my Undergrad in the Department of Economics, IIT Bombay.\n\nI consider myself a highly motivated and results driven individual, who thrives at the intersection of Technology and Finance.\n\nAs a Convener of the Web and Coding Club, I work towards the enrichment of the coding culture on campus by driving club initiatives, organising sessions and engaging in projects.\n\nLooking forward to connect and collaborate!",
            skills: ["Machine Learning", "Data Analytics", "C++", "Python", "R", "SQL"],
            social: {
                github: "https://github.com/sarthak-somani",
                twitter: "",
                linkedin: "https://www.linkedin.com/in/sarthak-somani/",
                instagram: ""
            },
            imageUrl: "./Images/SHARTHAK.png",
        }];

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const simulateTyping = (memberId, text) => {
        let currentText = "";
        const words = [
            "> Loading profile...",
            "> Accessing database...",
            "> Decrypting data...",
            "> Display: OK",
        ];
        let wordIndex = 0;
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (wordIndex === words.length) {
                clearInterval(typeInterval);
                setExpandedCards((prev) => ({ ...prev, [memberId]: true }));
                setTypingText((prev) => ({ ...prev, [memberId]: "" }));
                return;
            }

            const currentWord = words[wordIndex];
            if (charIndex === currentWord.length + 1) {
                currentText += "\n";
                wordIndex++;
                charIndex = 0;
            } else {
                currentText =
                    words.slice(0, wordIndex).join("\n") +
                    "\n" +
                    currentWord.slice(0, charIndex);
                charIndex++;
            }

            setTypingText((prev) => ({ ...prev, [memberId]: currentText }));
        }, 1);
    };

    const ChessChallenge = ({ username, rating }) => (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-3">
                <ChessIcon className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-medium">Chess Rating: {rating}</span>
            </div>
            <a
                href={`https://lichess.org/?user=${username}#friend`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
                <ChessIcon className="w-4 h-4" />
                Challenge to Chess
            </a>
        </div>
    );

 const MemberCard = ({ member, index }) => {
    const isExpanded = expandedCards[index];

    return (
      <Card className="relative overflow-hidden bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
        {/* Profile Section */}
        <div className="p-6 space-y-6">
          {/* Image and Basic Info */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-cyan-500/50">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-cyan-400">{member.role}</p>
            </div>
          </div>

          {/* Bio */}
          {/* <p className="text-gray-300 text-sm">{member.bio}</p> */}

          {/* Social Links */}
          <div className="flex gap-4">
            {member.social.github && (
              <a
                href={member.social.github}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {member.social.instagram && (
              <a
                href={member.social.instagram}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>

          {!isExpanded && (
            <button
              onClick={() => {
                simulateTyping(index, member.name);
              }}
              className="w-full bg-gray-800 text-cyan-400 px-4 py-2 rounded-md font-mono text-sm hover:bg-gray-700 transition-colors"
            >
              $ ./view-profile {member.name.toLowerCase().replace(" ", "-")}
            </button>
          )}
        </div>

        {/* Terminal Output */}
        {typingText[index] && (
          <div className="px-6 pb-4">
            <pre className="font-mono text-xs text-cyan-400 whitespace-pre-wrap">
              {typingText[index]}
            </pre>
          </div>
        )}

      {/* Details Section */}
<div
  className={`border-t border-cyan-500/20 transition-all duration-500 ${
    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
  } overflow-hidden`}
>
  <div className="p-6 h-[384px] flex flex-col justify-between">
    
    {/* Top Section: About & Skills */}
    <div className="space-y-6">
      {/* Bio (with scroll) */}
      <div className="max-h-40 overflow-y-auto pr-2 custom-scroll">
        <h4 className="text-sm font-semibold text-cyan-400 mb-3">About</h4>
        <p className="text-gray-300 text-sm">{member.bio}</p>
      </div>

      {/* Skills */}
      <div>
        <h4 className="text-sm font-semibold text-cyan-400 mb-3">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {member.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-md text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom Section: View Profile Button */}
    <button
      onClick={() => setSelectedMember(member)}
      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
    >
      View Full Profile
    </button>
  </div>
</div>


      </Card>
    );
  };

  return (
    <div className="space-y-12 relative">
      {/* Cursor gradient follow effect */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px at ${cursorPos.x}px ${cursorPos.y}px, rgba(103, 232, 249, 0.15), transparent 80%)`,
        }}
      />

      <div className="text-center relative">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-6">
          Meet Our Team
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          The brilliant minds behind WnCC's success
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <MemberCard key={index} member={member} index={index} />
        ))}
      </div>

      {/* Selected member modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl max-w-2xl w-full mx-4 relative">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-xl overflow-hidden">
                  <img
                    src={selectedMember.imageUrl}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  {selectedMember.icon}
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {selectedMember.name}
                    </h3>
                    <p className="text-cyan-400">{selectedMember.role}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{selectedMember.bio}</p>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedMember.chess && (
                  <div className="mt-6">
                    <ChessChallenge
                      username={selectedMember.chess.lichessUsername}
                      rating={selectedMember.chess.rating}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [codeString, setCodeString] = useState("");
    const [currentField, setCurrentField] = useState(null);

    useEffect(() => {
        const code = "> const contact = await WnCC.connect(you);";
        let index = 0;
        const interval = setInterval(() => {
            setCodeString(code.slice(0, index));
            index++;
            if (index > code.length) {
                index = 0;
            }
        }, 150);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
            alert("Message sent successfully!");
        }, 1000);
    };

    const renderFieldValue = (field, value) => {
        if (!value) return "";
        if (currentField === field) {
            return `"${value}█"`;
        }
        return `"${value}"`;
    };

    return (
        <div className="space-y-12 relative">
            <div className="hidden md:block absolute -right-4 top-10 text-cyan-500/20">
                <Code2 size={120} />
            </div>
            <div className="hidden md:block absolute -left-4 bottom-10 text-cyan-500/20">
                <Terminal size={120} />
            </div>

            <div className="text-center relative">
                <div className="font-mono text-cyan-400 mb-4 animate-pulse">
                    {codeString}
                </div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text mb-6">
                    Connect with WnCC
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <Card className="p-6 bg-gray-900/50 backdrop-blur border-cyan-500/20">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                        <Terminal className="w-6 h-6" /> Initialize Connection
                    </h3>
                    <div className="font-mono text-sm text-gray-400 mb-4">
            // Please fill in your details below
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6 font-mono">
                        <div className="bg-gray-900 p-4 rounded border border-cyan-500/20">
                            <div className="text-cyan-400">const userDetails = {"{"}</div>
                            <div className="pl-4 space-y-4">
                                <div>
                                    <label className="text-blue-400">name:</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        onFocus={() => setCurrentField("name")}
                                        onBlur={() => setCurrentField(null)}
                                        className="bg-transparent border-none outline-none text-green-400 ml-2 w-64"
                                        required
                                        placeholder="type your name..."
                                    />
                                    <span className="text-gray-500">,</span>
                                </div>
                                <div>
                                    <label className="text-blue-400">email:</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        onFocus={() => setCurrentField("email")}
                                        onBlur={() => setCurrentField(null)}
                                        className="bg-transparent border-none outline-none text-green-400 ml-2 w-64"
                                        required
                                        placeholder="enter your email..."
                                    />
                                    <span className="text-gray-500">,</span>
                                </div>
                                <div>
                                    <label className="text-blue-400">subject:</label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) =>
                                            setFormData({ ...formData, subject: e.target.value })
                                        }
                                        onFocus={() => setCurrentField("subject")}
                                        onBlur={() => setCurrentField(null)}
                                        className="bg-transparent border-none outline-none text-green-400 ml-2 w-64"
                                        required
                                        placeholder="message subject..."
                                    />
                                    <span className="text-gray-500">,</span>
                                </div>
                                <div>
                                    <label className="text-blue-400">message:</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                        onFocus={() => setCurrentField("message")}
                                        onBlur={() => setCurrentField(null)}
                                        className="bg-transparent border-none outline-none text-green-400 ml-2 w-full h-24 resize-none"
                                        required
                                        placeholder="type your message..."
                                    />
                                </div>
                            </div>
                            <div className="text-cyan-400">{"}"}</div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "> executing..."
                                : "> WnCC.sendMessage(userDetails)"}
                        </button>
                    </form>
                </Card>

                <div className="space-y-6">
                    <Card className="p-6 bg-gray-900/50 backdrop-blur border-cyan-500/20">
                        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                            <Globe className="w-5 h-5" /> Base Location
                        </h3>
                        <p className="text-gray-300 font-mono">
                            Web and Coding Club
                            <br />
                            Student Activity Center
                            <br />
                            IIT Bombay, Powai
                            <br />
                            Mumbai - 400076
                        </p>
                    </Card>

                    <Card className="p-6 bg-gray-900/50 backdrop-blur border-cyan-500/20">
                        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                            <Database className="w-5 h-5" /> Contact Database
                        </h3>
                        <div className="space-y-3 font-mono">
                            <p className="text-gray-300">email: wncc@iitb.ac.in</p>
                            <p className="text-gray-300">managers: Veeraditya Karan Parakh , Pratyaksh Bhardwaj</p>
                            <p className="text-gray-300">phone: +91 9449007525/9662201929</p>
                        </div>
                    </Card>

                    <Card className="p-6 bg-gray-900/50 backdrop-blur border-cyan-500/20">
                        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                            <Code2 className="w-5 h-5" /> Social Network
                        </h3>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/wncc"
                                className="text-gray-300 hover:text-cyan-400 transition-colors"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.instagram.com/wncc.iitb/"
                                className="text-gray-300 hover:text-cyan-400 transition-colors"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/wncc-iitb/posts/?feedView=all"
                                className="text-gray-300 hover:text-cyan-400 transition-colors"
                            >
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
const WebsitePreview = () => {
    const [currentPage, setCurrentPage] = useState("Home");
    const [isOpen, setIsOpen] = useState(false);

    // include SOC in your nav items
    const navItems = ["Home", "Events", "Resources", "Team", "Contact", "SOC"];

    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isOpen]);

    const handleNavClick = (item) => {
        if (item === "SOC") {
            // open SOC site in new tab
            window.open("https://wncc-soc.tech-iitb.org/", "_blank", "noopener");
            setIsOpen(false);
        } else {
            setCurrentPage(item);
            setIsOpen(false);
        }
    };

    const PageComponent = {
        Home: HomePage,
        Events: EventsPage,
        Resources: ResourcesPage,
        Team: TeamPage,
        Contact: ContactPage,
    }[currentPage];

    const quickLinks = [
        { title: "Contact Us", url: "" },
        { title: "Projects", url: "https://github.com/orgs/wncc/repositories" },
        { title: "Blog", url: "https://www.technewsworld.com/section/tech-blog" },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <nav className="bg-gray-900/50 backdrop-blur-lg border-b border-cyan-500/20 p-4 sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-cyan-400">
                        <img
                            src="/Images/Logo.png"
                            alt="WnCC IITB Logo"
                            className="h-8 w-auto"
                        />
                    </div>

                    {/* Hamburger menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-cyan-400 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={
                                        isOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16m-7 6h7"
                                    }
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Navbar */}
                    <div className="hidden md:flex gap-6">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => handleNavClick(item)}
                                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${currentPage === item
                                    ? "bg-cyan-500/20 text-cyan-400"
                                    : "text-gray-300 hover:text-cyan-400"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Navbar (Hamburger Menu) */}
                {isOpen && (
                    <div className="absolute bg-gray-800/90 w-full left-0 top-full flex flex-col gap-4 p-4 border-t border-cyan-500/20">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => handleNavClick(item)}
                                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${currentPage === item
                                    ? "bg-cyan-500/20 text-cyan-400"
                                    : "text-gray-300 hover:text-cyan-400"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            <main className="container mx-auto px-4 py-8">
                <PageComponent />
            </main>

            <footer className="bg-gray-900/50 backdrop-blur-lg border-t border-cyan-500/20 p-8 mt-16">
                <div className="container mx-auto grid md:grid-cols-4 gap-8">
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold text-cyan-400 mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link.url}
                                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                                    >
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold text-cyan-400 mb-4">
                            Contact
                        </h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>wncc@iitb.ac.in</li>
                            <li>Student Activity Center</li>
                            <li>IIT Bombay, Powai</li>
                            <li>Mumbai - 400076</li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-xl font-bold text-cyan-400 mb-4">
                            Connect
                        </h3>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/wncc"
                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                            <a
                                href="https://x.com/i/flow/login?redirect_after_login=%2Fwncc_iitb"
                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                            >
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/wncc-iitb/posts/?feedView=all"
                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                            >
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a
                                href="https://www.instagram.com/wncc.iitb/"
                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                href="https://linktr.ee/wncciitb"
                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                            >
                                <Link className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto mt-8 pt-8 border-t border-cyan-500/20 text-center">
                    <p className="text-gray-400">
                        © 2024 Web and Coding Club, IIT Bombay. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default WebsitePreview;
