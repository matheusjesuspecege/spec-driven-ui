import { Button } from "@/components/button/button";

export default function Home() {
  return (
    <div>
      <Button
        data-testid="button"
        className="bg-(--color-primary) text-(--color-text-primary) hover:bg-(--color-primary-hover)"
      >
        Upgrade now
      </Button>
      <Button
        data-testid="button-secondary"
        className="bg-(--color-primary) text-(--color-text-primary) hover:bg-(--color-primary-hover)"
        variant="secondary"
      >
        Upgrade now
      </Button>
    </div>
  );
}
