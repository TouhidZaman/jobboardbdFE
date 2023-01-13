import React, { useEffect } from "react";
import JobCard from "components/reusable/JobCard";
import { useGetJobsQuery } from "features/jobs/jobsAPI";
import Loading from "components/reusable/Loading";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetError } from "features/auth/authSlice";

const Jobs = () => {
  const { data, isLoading, isError, error } = useGetJobsQuery();
  const jobsData = data?.data || [];
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [isError, error, dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="pt-14">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Find Jobs</h1>
      </div>
      {jobsData?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {jobsData.map((job) => (
            <JobCard key={job._id} jobData={job} />
          ))}
        </div>
      ) : (
        <h3 className="text-center text-2xl mt-16">
          Oops! no jobs added yet, please come back later
        </h3>
      )}
    </div>
  );
};

export default Jobs;
