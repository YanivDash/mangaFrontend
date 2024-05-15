import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonComp = ({ parent_class, class_name, num }) => {
  let skeletons = [];

  for (let i = 0; i < num; i++) {
    skeletons.push(<Skeleton key={i} className={`${class_name}`} />);
  }

  return <div className={`${parent_class}`}>{skeletons.map((i) => i)}</div>;
};

export default SkeletonComp;
