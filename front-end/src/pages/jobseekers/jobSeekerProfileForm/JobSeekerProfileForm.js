import React, { useState, useEffect } from "react";
import styles from "./jobSeekerProfileFormHeader.module.css";
import JobSeekerProfileFormAbout from "./JobSeekerProfileFormAbout";
import JobSeekerProfileFormSkills from "./JobSeekerProfileFormSkills";
import JobSeekerProfileFormAbilityDiff from "./JobSeekerProfileFormAbilityDiff";
import JobSeekerProfileFormExperience from "./JobSeekerProfileFormExperience";
import JobSeekerProfileFormEducation from "./JobSeekerProfileFormEducation";

const JobSeekerProfileForm = () => {
  const [currentPage, setCurrentPage] = useState("About");
  const [aboutSchema, setAboutSchema] = useState();
  const [skillsSchema, setSkillsSchema] = useState();
  const [abilityDifferencesSchema, setAbilityDifferencesSchema] = useState();
  const [experienceSchema, setExperienceSchema] = useState();
  const [educationSchema, setEducationSchema] = useState();
  const [toSaveProfile, setToSaveProfile] = useState(false);
  const [profile, setProfile] = useState({
    about: "",
    skills: "",
    abilityDifferences: "",
    experience: "",
    education: "",
  });

  // Render the current page
  function manageCurrentPage(e) {
    setCurrentPage(e.target.innerText);
  }

  // Render the landing page depending on what type of user is logged in
  function displayCurrentPage() {
    switch (currentPage) {
      case "About":
        return (
          <JobSeekerProfileFormAbout
            setCurrentPage={setCurrentPage}
            setAboutSchema={setAboutSchema}
          />
        );
      case "Skills":
        return (
          <JobSeekerProfileFormSkills
            setCurrentPage={setCurrentPage}
            setSkillsSchema={setSkillsSchema}
          />
        );
      case "Ability Differences":
        return (
          <JobSeekerProfileFormAbilityDiff
            setCurrentPage={setCurrentPage}
            setAbilityDifferencesSchema={setAbilityDifferencesSchema}
          />
        );
      case "Experience":
        return (
          <JobSeekerProfileFormExperience
            setCurrentPage={setCurrentPage}
            setExperienceSchema={setExperienceSchema}
          />
        );
      case "Education":
        return (
          <JobSeekerProfileFormEducation
            setEducationSchema={setEducationSchema}
            setToSaveProfile={setToSaveProfile}
          />
        );
    }
  }
  const page = displayCurrentPage();

  // console.log(aboutSchema);
  // console.log(skillsSchema);
  // console.log(abilityDifferencesSchema);
  // console.log(experienceSchema);
  // console.log(educationSchema);

  useEffect(() => {
    const saveProfile = () => {
      if (
        aboutSchema &&
        skillsSchema &&
        abilityDifferencesSchema &&
        experienceSchema &&
        educationSchema &&
        toSaveProfile
      ) {
        setProfile({
          about: aboutSchema,
          skills: skillsSchema,
          abilityDifferences: abilityDifferencesSchema,
          experience: experienceSchema,
          education: educationSchema,
        });
      }
    };
    saveProfile();
  }, [toSaveProfile]);

  console.log(profile);

  return (
    <>
      <header>
        {/* Banner */}
        <div className="container-md">
          <div className="row" id={styles.banner}>
            <div className="d-flex justify-content-md-center m-0 p-0">
              <div className="col-md-2 m-3">
                <embed />
              </div>
              <div className="col-md-8 p-4">
                <h1 className=" mt-4 mb-3">{`This is my name`}</h1>
                <p style={{ fontSize: "1.3em" }}>{`This is my aspiration`}</p>
                <p>{`This is my personal brand statement`}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Form section buttons */}
        <div
          className="row w-100 m-0"
          style={{
            height: 58,
            boxShadow: "4px 2px 4px 2px rgba(20, 20, 20, 0.2)",
          }}
        >
          <div className="d-flex justify-content-md-center">
            <div
              className={`${styles.sectionButtons} p-3`}
              type="button"
              style={{
                backgroundColor: currentPage === "About" ? "#011036" : "",
                color: currentPage === "About" ? "white" : "",
              }}
              onClick={manageCurrentPage}
            >
              About
            </div>
            <div
              className={`${styles.sectionButtons} p-3`}
              type="button"
              style={{
                backgroundColor: currentPage === "Skills" ? "#011036" : "",
                color: currentPage === "Skills" ? "white" : "",
              }}
              onClick={manageCurrentPage}
            >
              Skills
            </div>
            <div
              className={`${styles.sectionButtons} p-3`}
              type="button"
              style={{
                backgroundColor:
                  currentPage === "Ability Differences" ? "#011036" : "",
                color: currentPage === "Ability Differences" ? "white" : "",
              }}
              onClick={manageCurrentPage}
            >
              Ability Differences
            </div>
            <div
              className={`${styles.sectionButtons} p-3`}
              type="button"
              style={{
                backgroundColor: currentPage === "Experience" ? "#011036" : "",
                color: currentPage === "Experience" ? "white" : "",
              }}
              onClick={manageCurrentPage}
            >
              Experience
            </div>
            <div
              className={`${styles.sectionButtons} p-3`}
              type="button"
              style={{
                backgroundColor: currentPage === "Education" ? "#011036" : "",
                color: currentPage === "Education" ? "white" : "",
              }}
              onClick={manageCurrentPage}
            >
              Education
            </div>
          </div>
        </div>
      </header>
      <main className="mt-4">{page}</main>
    </>
  );
};

export default JobSeekerProfileForm;
