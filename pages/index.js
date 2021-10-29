import { useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const fetcher = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return fetch("/api/status", options).then(res => res.json());
  } catch (error) {
    console.log(error, 'fetch error');
  }
}

export default function Home() {
  const [showStatus, setShowStatus] = useState(false);
  const [loading, setLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState([]);
  const [buttonText, setButtonText] = useState("Check...");

  const onCheck = async () => {
    try {
      setLoading("Loading... please wait");
      setShowStatus(false)
      const currentStatus = await fetcher();
      setLoading("");
      setShowStatus(true)
      setStatus(currentStatus);
      setButtonText("Try again!");
    } catch (err) {
      setErrorMessage("An error occurred.")
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>API testing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          priority
          src="/noodles.jpg"
          className={styles.borderCircle}
          height={144}
          width={144}
          alt="Noodles"
        />
        <h1 className={styles.title}>
          API Tester
        </h1>

        <section className={styles.content}>
          <div><p>{showStatus ? "Status:": "..."}</p></div>
          <div><p>{loading}</p></div>
          <div><p>{errorMessage}</p></div>
          <div>
            {
              status.map((m) => {
                if (m.status === "fulfilled") {
                  return (
                    <div key={m.name} className={styles.statusContainer}>
                      <div>{`Name: ${m.name}`}</div>
                      <div>{`Status: ${m.status}`}</div>
                      <div>{`Timing: ${m.value.timing}ms`}</div>
                      <div />
                    </div>
                  )
                }
                return (
                  <div key={m.name} className={`${styles.statusContainer} ${styles.error}`}>
                    <div>{`Name: ${m.name}`}</div>
                    <div>{`Status: ${m.status}`}</div>
                    <div>{`Timing: ${m.reason.timings.phases.total}ms`}</div>
                    <div>{`Reason: ${m.message}`}</div>
                    <div />
                  </div>
                )
              })
            }
          </div>
          <div><p /></div>
          <div>
            <button className={styles.button} type="button" onClick={onCheck} disabled={loading !== ""}>{buttonText}</button>
          </div>
        </section>
      </main>
    </div>
  )
}
