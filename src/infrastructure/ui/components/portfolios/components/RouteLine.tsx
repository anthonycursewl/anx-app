interface RouteLineProps {
    title?: string;
    description?: string,
    isContent?: boolean
}

export default function RouteLine({ title, description, isContent = true }: RouteLineProps) {
  return (
    <div className="anx--roadmap-diagram-title">
      <div className="anx--roadmap-diagram-title-icon">
        <span>!</span>

        {
          isContent &&
          <div className="anx--roadmap-line">
          <div className="anx-title-route">
            <h3>{title}</h3>
            <p>
              {description}
            </p>
          </div>
        </div>
        }
      </div>
    </div>
  );
}
