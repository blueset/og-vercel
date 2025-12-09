import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>A page with Open Graph Image.</h1>
      <figure>
        <img
          src="/api/1a23?title=Hello+World&type=design&desc=This+is+a+description+of+the+image."
          alt="Open Graph Image"
          width="1200"
          height="630"
        />
        <figcaption>Open Graph Image</figcaption>
      </figure>
      <figure>
        <img
          src="/api/blog?title=ようこそ、セカイへ&desc=これはブログの説明です。"
          alt="Open Graph Image"
          width="1200"
          height="630"
        />
        <figcaption>Open Graph Image</figcaption>
      </figure>
    </div>
  );
}
