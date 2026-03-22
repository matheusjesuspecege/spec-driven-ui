import { Button } from "@/components/button/button";

export default function Home() {
  return (
    <div>
      <Button data-testid="button">Upgrade now</Button>
      <Button data-testid="button-secondary" variant="secondary">
        Upgrade now
      </Button>
    </div>
  );
}
