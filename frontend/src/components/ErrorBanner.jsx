export default function ErrorBanner({ error }) {
  return <p className="error">{String(error)}</p>;
}
