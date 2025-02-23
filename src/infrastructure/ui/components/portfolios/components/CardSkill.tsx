interface CardSkillProps {
    imgSquare: string;
    path: string;
    alt: string;
}

export default function CardSkill({ imgSquare, path, alt }: CardSkillProps) {
  return (
    <div className="anx--skill-icon">
      <img src={imgSquare} alt="Square Img" id="anx-icon-to-move" />
      <img src={path} alt={alt} />
    </div>
  );
}
