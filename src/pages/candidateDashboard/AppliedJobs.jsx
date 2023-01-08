import React from "react";

// import JobCard from "components/reusable/JobCard";

const AppliedJobs = () => {
  return (
    <div>
      <h1 className="text-xl py-5">Applied jobs</h1>
      <div className="grid grid-cols-2 gap-5 pb-5">
        {/* {data?.data?.map((job) => (
          <JobCard jobData={job} />
        ))} */}
      </div>
    </div>
  );
};

export default AppliedJobs;

