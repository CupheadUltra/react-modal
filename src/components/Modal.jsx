// Modal.js
import React, { Component } from 'react';
import './Modal.css';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWindow = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 360px;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
`;

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      time: 0, // секунды
    };

    // id интервала сохраняем в поле экземпляра
    this.timerId = null;
  }

  // Открыть: выставляем isOpen и сразу запускаем таймер
  openModal = () => {
    // если уже открыт — не запускаем новый интервал
    if (this.state.isOpen) return;

    this.setState({ isOpen: true, time: 0 }, () => {
      // на всякий случай очистим старый интервал (если был)
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }

      // запускаем новый интервал, увеличиваем каждые 1 сек
      this.timerId = setInterval(() => {
        this.setState((prev) => ({ time: prev.time + 1 }));
      }, 1000);

      console.log('Таймер запущен, timerId =', this.timerId);
    });
  };

  // Закрыть: остановить таймер и сбросить время
  closeModal = () => {
    if (this.timerId) {
      clearInterval(this.timerId);
      console.log('Таймер остановлен, timerId =', this.timerId);
      this.timerId = null;
    }

    this.setState({ isOpen: false, time: 0 });
  };

  // Escape
  handleKey = (e) => {
    if (e.key === 'Escape' && this.state.isOpen) {
      this.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey);
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  render() {
    return (
      <>
        <button className="open-btn" onClick={this.openModal}>
          Відкрити модальне вікно
        </button>

        {this.state.isOpen && (
          <Backdrop onClick={this.closeModal}>
            <ModalWindow onClick={(e) => e.stopPropagation()}>
              <h2>Модальне вікно</h2>

              {/* Таймер */}
              <div style={{ margin: '12px 0' }}>
                <strong>Таймер:</strong> {this.state.time} сек.
              </div>

              <p>Модалка на класових компонентах.</p>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="close-btn" onClick={this.closeModal}>
                  Закрити
                </button>
              </div>
            </ModalWindow>
          </Backdrop>
        )}
      </>
    );
  }
}

export default Modal;
