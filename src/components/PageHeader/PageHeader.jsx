import React from "react";
import "./PageHeader.css";

export const PageHeader = ({ pageHeaderDetails }) => {
  const { pageTitle, subTitle, state } = pageHeaderDetails;

  return (
    <>
      <div>
        <div className="py-1 px-3 m-2 page-header container-flex-align-center radius-5 shadow">
          <div className="page-header-text">
            <div className="medium-text fw-700">{pageTitle}</div>
            <div>
              {state?.length}{" "}
              {state?.length > 1 ? `${subTitle}s` : `${subTitle}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
