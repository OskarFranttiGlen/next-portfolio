import React from 'react';
import Image from 'next/image';

interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  logo: string;
}

const experiences: Job[] = [
  {
    title: "Software Development Intern",
    company: "Preezie",
    location: "Melbourne, Victoria",
    period: "November 2022 - March 2023",
    description: [
      "Demonstrated proficiency in Angular 4, React, .NET, and microservices.",
      "Developed effective solutions to complex issues and debugged code efficiently.",
      "Adapted to fast-paced development environments and worked with both legacy and modern technologies.",
      "Collaborated with cross-functional teams, enhancing communication and teamwork skills."
    ],
    logo: "/preezie.png"
  },
  {
    title: "IT Administrator",
    company: "Ealwin Operations",
    location: "Melbourne, Victoria",
    period: "October 2020 - October 2021",
    description: [
      "Managed IT projects including planning, budgeting, and implementation.",
      "Installed and troubleshot hardware and software, administered networks, and ensured cybersecurity.",
      "Worked closely with stakeholders to design and implement solutions across 3 business groups."
    ],
    logo: "/ealwin.png" // You may need to add this logo to your public folder
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-100">Experience</h2>
      <div className="space-y-6">
        {experiences.map((job, index) => (
          <div key={index} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-600">
            <div className="flex items-start mb-2">
              <div className="bg-white rounded-full p-2 mr-4 w-24 h-24 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <Image 
                  src={job.logo} 
                  alt={`${job.company} logo`} 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-semibold text-gray-100">{job.title}</h3>
                <p className="text-lg text-gray-300">{job.company}, {job.location}</p>
                <p className="text-gray-400">{job.period}</p>
              </div>
            </div>
            <ul className="space-y-2 text-gray-300">
              {job.description.map((point, pointIndex) => (
                <li key={pointIndex} className="flex items-start">
                  <span className="mr-2 mt-1.5 text-gray-500">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;