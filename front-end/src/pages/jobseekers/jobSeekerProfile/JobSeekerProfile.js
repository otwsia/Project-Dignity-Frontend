import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./jobSeekerProfile.module.css";
import RecommendedJobsCard from "./resume/RecommendedJobsCard";
import SkillsetsCard from "./resume/SkillsetsCard";
import ExperienceCard from "./resume/ExperienceCard";
import EducationCard from "./resume/EducationCard";
import dummyRecommendedJobsData from "./recommendedJobs-dummy";
import autismIcon from "./resume/images/autism.png";
import hearingIcon from "./resume/images/hearing.png";
import intellectualIcon from "./resume/images/intellectual.png";
import physicalIcon from "./resume/images/physical.png";
import visualIcon from "./resume/images/visual.png";

const JobSeekerProfile = () => {
  // =========
  // Variables
  // =========
  // Change this profileIsCompleted initial value to false/true to access the NoProfile/CompletedProfile pages
  const [profileIsCompleted, setProfileIsComplete] = useState(true);
  const [profileData, setProfileData] = useState(undefined);

  const [recommendedJobsData, setRecommendedJobsData] = useState(
    dummyRecommendedJobsData
  );
  const [mappedComponents, setMappedComponents] = useState({});

  // ====================================
  // onMount useEffect fetch Profile Data
  // ====================================
  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async (req, res) => {
    try {
      const hardCodedId = "6352b602869782ec9b076cf3";

      const res = await fetch("http://127.0.0.1:5001/api/jobseekers/get", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: hardCodedId }),
      });
      const fetchedProfileData = await res.json();
      setProfileData(fetchedProfileData.profile);
    } catch (err) {
      console.log(err);
    }
  };

  // ================================================================
  // useEffect to map the Resume Cards after profileData has been set
  // ================================================================
  useEffect(() => {
    if (profileData !== undefined)
      // to prevent this from running onMount {
      mapResumeCards();
  }, [profileData]);

  function mapResumeCards() {
    // Map SkillsetsCard
    const skillsetsCards = profileData.skills.map((element) => (
      <SkillsetsCard skillset={element} key={Math.random()} />
    ));

    // Map Experience Cards
    const experienceCards = profileData.experience.map((element) => (
      <ExperienceCard experience={element} key={Math.random()} />
    ));

    // Map Education Cards
    const educationCards = profileData.education.map((element) => (
      <EducationCard education={element} key={Math.random()} />
    ));

    // Map AbilityDifferencesIcons
    const abilityDifferencesIcons = profileData.abilityDifferences.diff.map(
      (element) => {
        let iconImage = "";

        switch (element) {
          case "Autism":
            iconImage = autismIcon;
            break;
          case "Hearing":
            iconImage = hearingIcon;
            break;
          case "Intellectual":
            iconImage = intellectualIcon;
            break;
          case "Physical":
            iconImage = physicalIcon;
            break;
          case "Visual":
            iconImage = visualIcon;
            break;
        }

        return (
          <div className={styles.abilityDifferencesIcon} key={Math.random()}>
            <img
              src={iconImage}
              alt={`${element} Ability Difference Icon`}
              className={styles.abilityDifferencesImage}
            />
            <p className={styles.abilityDifferencesName}>{element}</p>
          </div>
        );
      }
    );

    // Set the mapped components to state
    setMappedComponents({
      skillsetsCards: skillsetsCards,
      experienceCards: experienceCards,
      educationCards: educationCards,
      abilityDifferencesIcons: abilityDifferencesIcons,
    });
  }

  // ==================================================================================================
  // Display either the NoProfile page or CompletedProfile page depending on whether profileIsCompleted
  // ==================================================================================================
  function displayProfile() {
    if (!profileIsCompleted) {
      // ==============
      // NoProfile Page
      // ==============
      return (
        <div className={styles.noProfileJobSeeker}>
          <p className={styles.noProfileHeading}>
            You Don't Have a Profile Yet
          </p>
          <p className={styles.noProfileText}>
            Create one now, so your future employer can get to know you better!
          </p>
          <Link to="/profile-form">
            <button className={styles.createProfileButton}>
              Create profile
            </button>
          </Link>
        </div>
      );
    } else {
      // =====================
      // CompletedProfile Page
      // =====================
      // Map RecommendedJobsCard
      const recommendedJobsCards = recommendedJobsData.map((element) => (
        <RecommendedJobsCard jobData={element} key={Math.random()} />
      ));

      // The CompletedProfile Page
      return (
        <div className={styles.completedProfileJobSeeker}>
          <div className={styles.savePrintResumeContainer}>
            <button className={styles.savePrintResumeButton}>
              Save Resume as PDF
            </button>
            <button className={styles.savePrintResumeButton}>
              Print Your Resume
            </button>
          </div>
          <div className={styles.completedProfileJobSeekerBottom}>
            <div className={styles.resume}>
              <div className={styles.resumeBanner}>
                <button className={styles.editProfileButton}>
                  <Link to="/profile-form">Edit Profile</Link>
                </button>
                <div className={styles.bannerContents}>
                  <img className={styles.bannerPhoto} alt="Banner Mugshot" />
                  <div className={styles.bannerText}>
                    <p className={styles.bannerName}>
                      {profileData && profileData.about.name}
                    </p>
                    <p className={styles.bannerAspirations}>
                      {profileData && profileData.about.aspiration}
                    </p>
                    <p className={styles.bannerBrandStatement}>
                      {profileData && profileData.about.brand}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.resumeMain}>
                <div className={styles.resumeSkillsets}>
                  <p className={styles.skillsetsTitle}>Skillsets</p>
                  <ul className={styles.skillsetsCards}>
                    {mappedComponents.skillsetsCards}
                  </ul>
                </div>
                <div className={styles.resumeAbilityDifferences}>
                  <p className={styles.abilityDifferencesTitle}>
                    About My Ability Differences
                  </p>
                  <div className={styles.abilityDifferencesIconsAndDescription}>
                    <div className={styles.abilityDifferencesIcons}>
                      {mappedComponents.abilityDifferencesIcons}
                    </div>
                    <div className={styles.abilityDifferencesDescription}>
                      <p>
                        <b>Diagnosis</b>:{" "}
                        {profileData &&
                          profileData.abilityDifferences.diagnosis}
                        <br />
                        <br />
                        {profileData && profileData.abilityDifferences.diffDesc}
                      </p>
                    </div>
                  </div>
                  <div className={styles.abilityDifferencesSupport}>
                    <li>
                      <span className={styles.supportRequiredTypeWords}>
                        Type of Support Required:{" "}
                      </span>
                      {profileData &&
                        (profileData.abilityDifferences.support.length === 1
                          ? profileData.abilityDifferences.support[0]
                          : [...profileData.abilityDifferences.support].join(
                              ", "
                            ))}
                    </li>
                    <br />
                    {profileData && profileData.abilityDifferences.supportDesc}
                  </div>
                  <div className={styles.abilityDifferencesExtraInfo}>
                    <li>
                      <span className={styles.supportRequiredTypeWords}>
                        My Preferred Mode of Communication:{" "}
                      </span>
                      {profileData &&
                        (profileData.abilityDifferences.comm.length === 1
                          ? profileData.abilityDifferences.comm[0]
                          : [...profileData.abilityDifferences.comm].join(
                              ", "
                            ))}
                    </li>
                    <br />
                    <li>
                      <span className={styles.supportRequiredTypeWords}>
                        My Aids Used:{" "}
                      </span>
                      {profileData &&
                        (profileData.abilityDifferences.aids.length === 1
                          ? profileData.abilityDifferences.aids[0]
                          : [...profileData.abilityDifferences.aids].join(
                              ", "
                            ))}
                    </li>
                    <br />
                    <li>
                      <span className={styles.supportRequiredTravel}>
                        I am{" "}
                        <b>
                          {profileData &&
                            (profileData.abilityDifferences.travel
                              ? "Able"
                              : "Unable")}
                        </b>{" "}
                        to travel independently.
                      </span>
                    </li>
                  </div>
                </div>
                <div className={styles.resumeExperience}>
                  <p className={styles.experienceTitle}>Experience</p>
                  {mappedComponents.experienceCards}
                </div>
                <div className={styles.resumeEducation}>
                  <p className={styles.educationTitle}>Education</p>
                  {mappedComponents.educationCards}
                </div>
              </div>
            </div>
            <div className={styles.profileRecommendedJobs}>
              <div className={styles.recommendedJobsHeader}>
                <div className={styles.recommendedJobsHeaderLineOne}>
                  Only visible to you
                </div>
                <div className={styles.recommendedJobsHeaderLineTwo}>
                  Jobs Recommended For You
                </div>
              </div>
              {recommendedJobsCards}
            </div>
          </div>
        </div>
      );
    }
  }

  // ======
  // Return
  // ======
  const profilePage = displayProfile();
  return <>{profilePage}</>;
};

export default JobSeekerProfile;