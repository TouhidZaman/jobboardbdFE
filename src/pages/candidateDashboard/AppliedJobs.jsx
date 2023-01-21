import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { useGetAppliedJobsQuery } from "features/jobs/jobsAPI";
import JobCard from "components/reusable/JobCard";
import { resetError } from "features/auth/authSlice";
import Loading from "components/reusable/Loading";

const AppliedJobs = () => {
  const {
    user: { email },
    isLoading,
  } = useSelector((state) => state.auth);
  const { data, isError, error } = useGetAppliedJobsQuery(email, { skip: !email });
  const dispatch = useDispatch();
  const jobsData = data?.data || [];
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [isError, error, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const activeClass = "text-white  bg-primary border-white";

  return (
    <section className="px-4">
      <div className="py-4 flex justify-between">
        <h1 className="text-xl font-semibold">Applied Jobs</h1>

        <button
          className={`border px-3 py-2 rounded-full  ${approved ? activeClass : ""}`}
          onClick={() => setApproved((prevSate) => !prevSate)}
        >
          Approved Only
        </button>
      </div>
      {jobsData?.length ? (
        <div className="grid grid-cols-2 gap-5 pb-5">
          {jobsData.map((job) => (
            <JobCard key={job._id} jobData={job} />
          ))}
        </div>
      ) : (
        <h3 className="text-center text-2xl mt-16">
          Oops you have applied no jobs yet!
        </h3>
      )}
    </section>
  );
};

export default AppliedJobs;
