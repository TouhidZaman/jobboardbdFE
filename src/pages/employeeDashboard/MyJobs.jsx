import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { useGetMyJobsQuery } from "features/jobs/jobsAPI";
import JobCard from "components/reusable/JobCard";
import { resetError } from "features/auth/authSlice";
import Loading from "components/reusable/Loading";

const MyJobs = () => {
  const {
    user: { _id: employerId },
    isLoading,
  } = useSelector((state) => state.auth);
  const { data, isError, error } = useGetMyJobsQuery(employerId, {
    skip: !employerId,
  });
  const dispatch = useDispatch();
  const jobsData = data?.data || [];

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
    <section>
      <div className="py-4 flex justify-between">
        <h1 className="text-xl font-semibold">My Jobs</h1>
      </div>
      <div className="grid grid-cols-2 gap-5 pb-5">
        {jobsData.map((job) => (
          <JobCard key={job._id} jobData={job} />
        ))}
      </div>
    </section>
  );
};

export default MyJobs;

