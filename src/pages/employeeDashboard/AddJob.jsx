import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { useAddJobMutation } from "features/jobs/jobsAPI";
import { resetError } from "features/auth/authSlice";
import Loading from "components/reusable/Loading";

const AddJob = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [postJob, { isSuccess, isError, error }] = useAddJobMutation();
  const { handleSubmit, register, reset, control } = useForm();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Job added successfully");
      // navigate("/my-jobs");
    } else if (isError) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [isSuccess, isError, error, dispatch]);

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset({ companyName: user.companyName });
  }, [user, reset]);

  const {
    fields: resFields,
    append: resAppend,
    remove: resRemove,
  } = useFieldArray({ control, name: "responsibilities" });
  const {
    fields: skillFields,
    append: skillAppend,
    remove: skillRemove,
  } = useFieldArray({ control, name: "skills" });
  const {
    fields: reqFields,
    append: reqAppend,
    remove: reqRemove,
  } = useFieldArray({ control, name: "requirements" });

  const onSubmit = (data) => {
    const newJob = {
      ...data,
      employerId: user._id,
      applicants: [],
      queries: [],
    };
    postJob(newJob);
    reset();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center overflow-auto p-10">
      <form
        className="bg-secondary/20 shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="w-full text-2xl text-primary mb-5">Add a new position</h1>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="position">
            Position
          </label>
          <input type="text" id="position" {...register("position")} />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="companyName">
            Company Name
          </label>
          <input
            disabled
            className="cursor-not-allowed"
            type="text"
            id="companyName"
            {...register("companyName")}
          />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="experience">
            Experience
          </label>
          <input type="text" id="experience" {...register("experience")} />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="workLevel">
            Work Level
          </label>
          <input type="text" id="workLevel" {...register("workLevel")} />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="employmentType">
            Employment Type
          </label>
          <input type="text" id="employmentType" {...register("employmentType")} />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="salaryRange">
            Salary Range
          </label>
          <input type="text" id="salaryRange" {...register("salaryRange")} />
        </div>
        <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="location">
            Location
          </label>
          <input type="text" id="location" {...register("location")} />
        </div>
        <hr className="w-full mt-2 bg-black" />
        <div className="flex flex-col w-full">
          <label className="mb-2" htmlFor="overview">
            Overview
          </label>
          <textarea rows={8} {...register("overview")} id="overview" />
        </div>
        <div className="flex flex-col w-full">
          <label className="mb-2">Skills</label>
          <div>
            <div>
              {skillFields.map((item, index) => {
                return (
                  <div key={item.key} className="flex items-center gap-3 mb-5">
                    <input
                      className="!w-full"
                      type="text"
                      {...register(`skills[${index}]`)}
                    />
                    <button
                      type="button"
                      onClick={() => skillRemove(index)}
                      className="grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11 group transition-all hover:bg-red-500"
                    >
                      <FiTrash
                        className="text-red-500 group-hover:text-white transition-all"
                        size="20"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button type="button" onClick={() => skillAppend("")} className="btn">
                Add Skill
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label className="mb-2">Responsibilities</label>
          <div>
            <div>
              {resFields.map((item, index) => {
                return (
                  <div key={item.key} className=" mb-5 flex items-center gap-3">
                    <input
                      className="!w-full"
                      type="text"
                      {...register(`responsibilities[${index}]`)}
                    />
                    <button
                      type="button"
                      onClick={() => resRemove(index)}
                      className="grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11 group transition-all hover:bg-red-500"
                    >
                      <FiTrash
                        className="text-red-500 group-hover:text-white transition-all"
                        size="20"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button type="button" onClick={() => resAppend("")} className="btn">
                Add Responsibility
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label className="mb-2">Requirements</label>
          <div>
            <div>
              {reqFields.map((item, index) => {
                return (
                  <div key={item.key} className=" mb-5 flex items-center gap-3">
                    <input
                      className="!w-full"
                      type="text"
                      {...register(`requirements[${index}]`)}
                    />
                    <button
                      type="button"
                      onClick={() => reqRemove(index)}
                      className="grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11 group transition-all hover:bg-red-500"
                    >
                      <FiTrash
                        className="text-red-500 group-hover:text-white transition-all"
                        size="20"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              <button type="button" onClick={() => reqAppend("")} className="btn">
                Add Requirement
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center w-full mt-3">
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;

