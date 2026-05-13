"use client";

import { LinkedinFilled } from "@ant-design/icons";
import { Avatar } from "antd";
import styles from "./about.module.css";

const team = [
  {
    name: "Mehdi BENRABIAA",
    role: "Co-Founder & Developer",
    bio: "Mehdi built Altera to make data extraction effortless inside Orange Data Mining. Designed for speed, scale, and clarity — every widget and feature reflects real workflows and real pain points.",
    src: "/Profile Pic.png",
    linkedin: "https://www.linkedin.com/in/mehdi-benrabiaa-7551a217b/?skipRedirect=true",
  },
  {
    name: "Rayan CH",
    role: "Co-Founder & Product Designer",
    bio: "Rayan shapes the look, feel, and experience of Altera. From the first wireframe to the final pixel, he ensures every interaction is intuitive, clean, and purposeful.",
    src: null,
    linkedin: null,
  },
];

export default function TeamCards() {
  return (
    <div className={styles.grid}>
      {team.map((member) => (
        <div key={member.name} className={styles.card}>
          {member.src ? (
            <Avatar size={80} src={member.src} alt={member.name} style={{ flexShrink: 0 }} />
          ) : (
            <Avatar size={80} style={{ flexShrink: 0, background: "#f0f0f0", color: "#888", fontSize: 18, fontWeight: 600 }}>
              {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </Avatar>
          )}
          <div>
            <p className={styles.name}>{member.name}</p>
            <p className={styles.role}>{member.role}</p>
            <p className={styles.bio}>{member.bio}</p>
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedIn}>
                <LinkedinFilled style={{ fontSize: 16 }} />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
