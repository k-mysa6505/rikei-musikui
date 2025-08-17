import React, { useState } from 'react';
import { validatePlayerName } from '../utils/rankingUtils';

type PlayerNameModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
};

const PlayerNameModal: React.FC<PlayerNameModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    const validation = validatePlayerName(name);
    
    if (!validation.valid) {
      setError(validation.error || 'Invalid name');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(name.trim());
      setName('');
      onClose();
    } catch (error) {
      setError('エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setName('');
    setError(null);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) {
      setError(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="player-name-modal" onClick={handleCancel}>
      <div className="player-name-modal-content" onClick={e => e.stopPropagation()}>
        <div className="player-name-header">
          <h3>プレイヤー名を入力</h3>
          <button className="close-button" onClick={handleCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="player-name-form">
          <div className="input-group">
            <label htmlFor="playerName">名前</label>
            <input
              id="playerName"
              type="text"
              value={name}
              onChange={handleInputChange}
              placeholder="プレイヤー名を入力してください"
              maxLength={20}
              autoFocus
              disabled={isSubmitting}
              className={error ? 'error' : ''}
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          
          <div className="player-name-buttons">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
              disabled={isSubmitting}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting || !name.trim()}
            >
              {isSubmitting ? '保存中...' : 'ランキング登録'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerNameModal;
