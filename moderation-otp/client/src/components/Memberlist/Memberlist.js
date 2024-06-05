import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Style/moderateurs.css";
import Loader from "../Loader/Loader.js";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://www.moderation-otp.fr/api/users/members")
      .then((response) => {
        const filteredMembers = response.data
          .filter((member) => member.roles.includes("1043572037479829575"))
          .map((member) => ({
            nick: member.nick || member.user.global_name,
            userId: member.user.id,
            avatarUrl: member.user.avatar,
          }));

        setMembers(filteredMembers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des membres:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="members-main">
      <h2>Modos</h2>
      <div className="members">
        {members.map((member) => (
          <a key={member.userId} className="member" href="#">
            <p>{member.nick}</p>
            <img
              src={
                member.avatarUrl
                  ? `https://cdn.discordapp.com/avatars/${member.userId}/${member.avatarUrl}.png`
                  : "path_to_default_image.png"
              }
              alt="Avatar de l'utilisateur"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Members;
