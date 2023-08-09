import { Button } from "@/components/Button";
import styles from "./styles.module.scss";
import ProductCard from "@/components/ProductCard";
import { GetServerSideProps, NextPage } from "next";
import { CarData } from "@/schemas/carSchema";
import api from "@/services/api";


interface HomeProps {
    cars: CarData[]
}

const Home: NextPage<HomeProps> = ({cars}:HomeProps) => {
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
            {cars.map(car=>{
                return <ProductCard key={car.id} car={car}/>
            })}
        </main>
    );
}


export const getServerSideProps: GetServerSideProps = async () => {
    const response = await api.get<CarData[]>("/cars")
    return {
        props: {
            cars: response.data
        }
    }
}

export default Home