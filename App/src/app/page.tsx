import Link from "next/link";
// import styles from "./index.module.css";

export default function Home() {
  return (
    <main>
      <h1>Client Management Application</h1>
      <div>
        <Link href="/add-client">Add New Client</Link>
        <h2>Existing Clients</h2>
        <p>Client list and search will go here.</p>
      </div>
    </main>
  );
}
