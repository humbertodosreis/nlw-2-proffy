import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import teacherPhoto from '../../assets/photos/XzAyNjQ4OTcuanBn.jpg';
import './style.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
          <header>
            <img src={teacherPhoto} alt="Teacher" />
            <div>
              <strong>Nome</strong>
              <span>Matéria</span>
            </div>
          </header>
          <p>
            Entusiasta das melhores tecnologias de quimica avançada
            <br />
            Apaixonado por explodir coisas em laboratório e mudar a vida das pessoas.
          </p>

          <footer>
            <p>
              Preço/hora <strong>R$ 80,00</strong>{' '}
            </p>
            <button>
              <img src={whatsappIcon} alt="Whatsapp" />
              Entrar em contato
            </button>
          </footer>
        </article>
    )
}

export default TeacherItem;