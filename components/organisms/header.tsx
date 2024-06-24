export default function Header() {
  return (
    <header>
      <div class="flex justify-between items-center">
        <h1 class="text-md">
          <a href="/">Home</a>
        </h1>
        <div class="text-md">
          <a href="/articles">Articles</a>
        </div>
      </div>
      <hr class="mb-1 border-foreground" />
    </header>
  );
}
