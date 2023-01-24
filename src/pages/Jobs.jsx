import React, { useEffect } from "react";
import JobCard from "components/reusable/JobCard";
import { useGetJobsQuery } from "features/jobs/jobsAPI";
import Loading from "components/reusable/Loading";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetError } from "features/auth/authSlice";
import { clearSearch } from "features/filter/filterSlice";

const Jobs = () => {
  const { keywords } = useSelector((state) => state.filter);
  const { data, isLoading, isError, error } = useGetJobsQuery();
  const jobsData = data?.data || [];
  let filteredJobs = [];
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

  //Applying search filtering
  if (keywords) {
    let keywordsArray = keywords.split(" ");
    filteredJobs = jobsData.filter((job) =>
      keywordsArray.some(
        (keyword) =>
          job.position?.toLowerCase().includes(keyword.toLowerCase()) ||
          job.employmentType?.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  } else {
    filteredJobs = jobsData;
  }
  return (
    <div className="pt-14">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl">
            Find Jobs{keywords ? `: showing results for "${keywords}"` : ""}
          </h1>
          <button
            className={`btn ${!keywords ? "hidden" : ""}`}
            onClick={() => dispatch(clearSearch())}
          >
            Clear Search
          </button>
        </div>
      </div>
      {filteredJobs?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} jobData={job} />
          ))}
        </div>
      ) : (
        <h3 className="text-center text-2xl mt-16">Oops! no jobs found</h3>
      )}
    </div>
  );
};

export default Jobs;
