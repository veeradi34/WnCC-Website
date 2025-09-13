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
import { generateCalendarUrl } from '../utils/helpers';
import Card from './common/Card';
import ParticleEffect from './common/ParticleEffect';
import TechNewsFeed from './common/TechNewsFeed';

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
        { text: "Seasons of Code Begins", time: " 21st May" },
        { text: "Launch of DSA Bootcamp", time: "1st June" },
        { text: "Kickoff of the Learners' Space", time: "9th June" }


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
                    coding. The secret to getting ahead is getting started, and we're here
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

// Home Page Component
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

// Export all the page components 
export const WebsitePreviewComponents = {
    "Home": <HomePage />,
    // We'll use the page components from WnCCWebsite.js
    // The other pages will be handled directly in the WnCCWebsite.js file
};

// Export these for use in the main file
export { HomePage };
