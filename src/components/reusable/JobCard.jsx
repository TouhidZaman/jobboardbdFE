import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { resetError } from "features/auth/authSlice";
import { useCloseJobByIdMutation } from "features/jobs/jobsAPI";

const JobCard = ({ jobData, isEmployer }) => {
  const navigate = useNavigate();
  const { _id, position, companyName, location, employmentType, applicants } =
    jobData || {};
  const [closeJob, { isSuccess, isError, error }] = useCloseJobByIdMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Job position closed successfully");
      // navigate("/my-jobs");
    } else if (isError) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [isSuccess, isError, error, dispatch]);

  return (
    <div key={_id} className="border border-gray-300 shadow-sm p-5 rounded-2xl">
      <div className="flex justify-between">
        <div>
          <p>
            <Link to={`/job-details/${_id}`} className="text-xl hover:text-primary">
              {position}
            </Link>
          </p>
          <small className="">
            by{" "}
            <span className="font-semibold hover:text-primary cursor-pointer hover:underline transition-all">
              {companyName}
            </span>
          </small>
        </div>
        <p>{location}</p>
      </div>
      <div className="flex justify-between items-center mt-5">
        <p>{employmentType}</p>
        {isEmployer ? (
          <div className="flex space-x-2">
            <button
              className="btn"
              disabled={!applicants?.length}
              onClick={() => navigate(`/job-applicants/${_id}`)}
            >
              View Applicants ({applicants?.length || "0"})
            </button>
            <button className="btn" onClick={() => closeJob(_id)}>
              Close
            </button>
          </div>
        ) : (
          <p>Total Applied ({applicants?.length || "0"})</p>
        )}
      </div>
    </div>
  );
};

export default JobCard;
