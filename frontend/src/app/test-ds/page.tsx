"use client";

import { Button } from "@/components/button/button";
import { useState } from "react";

export default function TestDS() {
  return (
    <>
      <Buttons />
    </>
  );
}

const Buttons = () => (
  <div className="flex flex-col gap-5 w-screen">
    <Button data-testid="button-inverse" variant="inverse" fullWidth>
      Upgrade Now
    </Button>
    <Button data-testid="button-disabled-inverse" variant="inverse" fullWidth disabled>
      Upgrade Now
    </Button>
    <Button data-testid="button-loading-inverse" variant="inverse" fullWidth loading>
      Upgrade Now
    </Button>
    <ButtonWithLoading />
  </div>
);

const ButtonWithLoading = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      data-testid="button-click-loading-inverse"
      variant="inverse"
      fullWidth
      loading={loading}
      onClick={() => setLoading(true)}
    >
      Upgrade Now
    </Button>
  );
};