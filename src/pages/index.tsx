import { Button } from "@/components/Button";
import { Inter } from "next/font/google";
import styles from "./styles.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const classes = `styles.button styles.purpleButton`;

    return (
        <main>
            <Button className={styles.purpleButton} text="Text Button" />
            <Button className={styles.blueButton} text="Text Button" />
            <h1>HELLO WORLD</h1>
        </main>
    );
}
