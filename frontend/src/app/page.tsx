import { Button } from "@/components/button/button";

export default function Home() {
  return (
    <div>
      <Button data-testid="button-inverse" variant="inverse">
        Upgrade now
      </Button>
    </div>
  );
}
