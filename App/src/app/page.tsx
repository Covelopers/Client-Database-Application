"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
//import styles from "./index.module.css";

type Client = {
  id: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  notes?: string;
};

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/clients");
        if (!res.ok) throw new Error("Failed to load clients.");
        const data = await res.json();
        setClients(data.clients);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchClients();
  }, []);

  return (
    <main>
      <h1>Client Management Application</h1>
      <div>
        <button>
          <Link href="/add-client">Add New Client</Link>
        </button>
        <h2>Existing Clients</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {clients.length > 0 ? (
          <ul>
            {clients.map((client) => (
              <li key={client.id}>
                <strong>{client.fullName}</strong> - {client.email || "No email"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No clients found.</p>
        )}
      </div>
    </main>
  );
}
