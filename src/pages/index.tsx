import { Button } from "@/components/Button";
import { Inter } from "next/font/google";
import styles from "./styles.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main className={styles.mainContainer}>
            <Button className={styles.grey0Button} text="Text Button" />
            <Button className={styles.grey1Button} text="Text Button" />
            <Button
                className={styles.grey2TextLightButton}
                text="Text Button"
            />
            <Button
                className={styles.grey2TextDarkerButton}
                text="Text Button"
            />
            <Button
                className={styles.grey5TextWhiteButton}
                text="Text Button"
            />
            <Button className={styles.brand1Button} text="Text Button" />
            <Button className={styles.brand2Button} text="Text Button" />
            <Button
                className={styles.brand4TextBrand1Button}
                text="Text Button"
            />
            <Button
                className={styles.grey10TextGrey1Button}
                text="Text Button"
            />
            <Button
                className={styles.grey10BorderGrey0Button}
                text="Text Button"
            />
            <Button
                className={styles.grey10BorderGrey4TextGrey0Button}
                text="Text Button"
            />
            <Button
                className={styles.grey10BorderAndTextBrand1Button}
                text="Text Button"
            />
            <Button
                className={styles.brand4BorderAndTextBrand1Button}
                text="Text Button"
            />
            <Button
                className={styles.grey8TextGrey0Button}
                text="Text Button"
            />
            <Button
                className={styles.feedbackAlert3TextFeedbackAlert1Button}
                text="Text Button"
            />
            <Button
                className={styles.feedbackAlert2TextFeedbackAlert1Button}
                text="Text Button"
            />
            <Button
                className={styles.feedbackSuccess3TextFeedbackSuccess1Button}
                text="Text Button"
            />
            <Button
                className={styles.feedbackSuccess2TextFeedbackSuccess1Button}
                text="Text Button"
            />
            <Button
                className={styles.brand3TextBrand4Button}
                text="Text Button"
            />
        </main>
    );
}
