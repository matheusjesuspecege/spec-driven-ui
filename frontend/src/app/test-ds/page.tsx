"use client";

import { Avatar } from "@/components/avatar/avatar";
import { Button } from "@/components/button/button";
import { useState } from "react";

export default function TestDS() {
  return (
    <>
      <Buttons />
      <Form />
      <Avatar initials="MR" />
      <Avatar initials="AB" size="sm" data-testid="avatar-sm" />
      <Avatar initials="CD" size="lg" data-testid="avatar-lg" />
      <Avatar initials="EF" size="xl" data-testid="avatar-xl" />
      <Avatar initials="GH" size="md" backgroundColor="#FF0000" textColor="#FFFFFF" data-testid="avatar-custom" />
      <Avatar initials="JD" aria-label="Foto de João Silva" data-testid="avatar-aria" />
    </>
  );
}

const Buttons = () => (
  <div className="flex flex-col gap-5 w-screen">
    <Button
      data-testid="button-inverse"
      variant="inverse"
      fullWidth
      className="upgrade-btn"
    >
      Upgrade Now
    </Button>
    <Button
      data-testid="button-disabled-inverse"
      variant="inverse"
      fullWidth
      disabled
    >
      Upgrade Now
    </Button>
    <Button
      data-testid="button-loading-inverse"
      variant="inverse"
      fullWidth
      loading
    >
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

const Form = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <form
      data-testid="form-submitted"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <Button data-testid="button-inverse-form" variant="inverse" type="button">
        Submit
      </Button>
      {submitted && <span>Form submitted!</span>}
    </form>
  );
};
