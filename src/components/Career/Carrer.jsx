import React from 'react'
import styles from './Carrer.module.scss'
import bikeDelivery from '../assets/carrerPhotos/bikeDelivery.png'
import carDelivery from '../assets/carrerPhotos/carDelivery.png'
import pizzaMaker from '../assets/carrerPhotos/pizzamaker.jpg'

function Carrer() {
    return (
        <div className={styles.carrer}>
            <ul className={styles.listCards}>
                <li className={styles.card}>
                <img src={bikeDelivery}/>
                <div className={styles.textInfo}>
                <h3>Велокур'єр</h3>
                <p>Любиш кататися? Люби і катайся!
                У нас найкоротші доставки, робота в знайомому районі! Приєднуйся до команди лідерів -
                 # працюйкайфуй в React Pizza UA.</p>
                </div>
                </li>
                <li className={styles.card}>
                <img src={carDelivery}/>
                <div className={styles.textInfo}>
                <h3>Автокур`єр</h3>
                <p>Любиш кататись? - Люби та катайся!
Радіус доставки всього 5-6 км а графіки роботи змінні та гнучкі.
Компанія компенсує пальне та амортизацію авто. Гайда з нами!</p>
                </div>
                </li>
                <li className={styles.card}>
               <img src={pizzaMaker}/>
                <div className={styles.textInfo}>
                <h3>Піцамейкер</h3>
                <p>Любиш піцу?
                Обирай зручний графік та локацію. Твоя апетитна кар'єра поруч, приєднуйся – буде смачно!</p>
                </div>
                </li>
            </ul>
            <div>
                <h2>Надіслати резюме</h2>
                <form className={styles.carrerForm}>
                    <label>Ім'я
                    <input placeholder="Ваше ім'я"/>
                    </label>
                    <label>Прізвище
                    <input placeholder='Прізвище'/>
                    </label>
                    <label>
                        Місто
                    <select value='Місто' name="Місто" required>
                        <option value="" disabled selected hidden >Місто</option>
                        <option>Бровари</option>
                        <option>Буча</option>
                        <option>Вінниця</option>
                        <option>Київ</option>
                        <option>Ірпінь</option>
                        <option>Рівне</option>
                        <option>Одеса</option>
                    </select>
                    </label>
                    <label>Дата народження
                        <select>

                        </select>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Carrer
