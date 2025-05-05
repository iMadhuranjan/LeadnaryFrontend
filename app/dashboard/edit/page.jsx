// pages/dashboard/edit.js
"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import LandingPageUpdate from "@/components/LandingPageUpdate";
import { getLandingPageData } from "@/app/store/pageSlice";
import { SharingunLoader } from "@/components/Spinner";

export default function DashboardEdit() {
  const dispatch = useDispatch();
  const router = useRouter();

  /* auth slice */
  const {
    isAuthenticated,
    loading: authLoading,
    user,
  } = useSelector((s) => s.auth);

  /* page slice */
  const {
    landingPage,
    loading: pageLoading,
    error,
  } = useSelector((s) => s.page);

  /* list of sub-domains the user owns */
  const subs = user?.subdomains || [];

  /* which sub-domain are we editing?  */
  const [selectedSub, setSelectedSub] = useState("");

  /* choose first sub once we have them */
  useEffect(() => {
    if (!selectedSub && subs.length) setSelectedSub(subs[0].name);
  }, [subs, selectedSub]);

  /* redirect if not logged in */
  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/login");
  }, [authLoading, isAuthenticated, router]);

  /* fetch landing-page JSON any time the chosen sub changes */
  useEffect(() => {
    if (isAuthenticated && selectedSub) {
      dispatch(getLandingPageData({ subdomain: selectedSub }));
    }
  }, [isAuthenticated, selectedSub, dispatch]);

  // if (authLoading || !isAuthenticated) return <p>Loading…</p>;

  return (
    <section className="mx-auto">
      {pageLoading ? (
        <SharingunLoader />
      ) : (
        <LandingPageUpdate
          subs={subs} /* list for the <select> */
          selectedSub={selectedSub} /* current choice         */
          onSubChange={setSelectedSub} /* let child switch sub   */
          initialPage={landingPage || null} /* may be null if none    */
          apiError={error}
        />
      )}
    </section>
  );
}
