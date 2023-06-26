"use client"
import React from 'react';

const ProgressBar = ({ label, percent, color }) => {
    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
                <span className={`text-xs font-semibold text-${color}`}>{percent}%</span>
            </div>
            <div className="relative h-2 rounded-full bg-gray-200">
                <div className={`absolute top-0 left-0 h-2 rounded-full bg-${color}`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );
};

const Skills = () => {
    return (
        <div className="max-w-5xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                    <ProgressBar label="HTML" percent={90} color="blue-500" />
                    <ProgressBar label="CSS" percent={80} color="purple-500" />
                    <ProgressBar label="JavaScript" percent={70} color="yellow-500" />
                    <ProgressBar label="React" percent={80} color="blue-500" />
                    <ProgressBar label="Next.js" percent={70} color="purple-500" />
                </div>
                <div>
                    <ProgressBar label="PHP" percent={70} color="yellow-500" />
                    <ProgressBar label="Laravel" percent={60} color="red-500" />
                    <ProgressBar label="Python" percent={50} color="green-500" />
                    <ProgressBar label="Django" percent={40} color="yellow-500" />
                    <ProgressBar label="MySQL" percent={60} color="green-500" />
                </div>
            </div>
        </div>
    );
};

export default Skills;
