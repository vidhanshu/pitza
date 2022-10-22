import React from "react";

function Section({ children, title, description }) {
  return (
    <div className="py-10 max-w-6xl m-auto block">
      <h1 className="text-4xl font-extrabold text-center">{title}</h1>
      <p className="max-w-sm text-md m-auto text-center mt-2 text-text-gray">
        {description}
      </p>
      <div>{children}</div>
    </div>
  );
}

export default Section;
