import React, { useState } from 'react'
import './PasswordGenerator.css'
import { FaRegClipboard } from 'react-icons/fa'

function PasswordGenerator() {
    const [length, setLength] = useState('')
    const [useAlphabets, setUseAlphabets] = useState(true)
    const [useNumbers, setUseNumbers] = useState(true)
    const [useSymbols, setUseSymbols] = useState(true)
    const [password, setPassword] = useState('')

    const generatePassword = () => {
        let len = Number(length);

        let chars = ''
        if (useAlphabets) chars += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if (useNumbers) chars += '0123456789'
        if (useSymbols) chars += '!@#$%^&*_=.<>'

        if (!chars) {
            alert("Please select at least one character type.");
            return;
        }

        if (len < 4 || len > 20) {
            alert('Please enter a valid length (4–20).');
            return;
        }

        let generated = ''
        while (len) {
            generated += chars.charAt(
                Math.floor(
                    Math.random() * chars.length));
            len--;
        }

        setPassword(generated)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        alert('Copied to clipboard!');
    };

    return (
  <div className="password-generator-container">
    <div className="password-display-row">
  <div className="password-display">
    {password || <span style={{ color: '#888' }}>Your password will appear here</span>}
  </div>

  <button onClick={copyToClipboard} className="copy-button-inline">
    <FaRegClipboard className="text-xl" />
  </button>
</div>

    <div className="input-section">
      <div className="input-row">
        <label className="text-sm">Length of Password</label>
        <input
          type="text"
          value={length}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) {
              setLength(val);
            }
          }}
          className="length-input"
          placeholder="4-20"
        />
      </div>

      <div className="checkbox-row">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useAlphabets}
            onChange={() => setUseAlphabets(!useAlphabets)}
          />
          <span>Alphabets</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={() => setUseNumbers(!useNumbers)}
          />
          <span>Numbers</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={() => setUseSymbols(!useSymbols)}
          />
          <span>Special Characters</span>
        </label>
      </div>
    </div>

    <button onClick={generatePassword} className="generate-button">
      Generate
    </button>
  </div>
);

}

export default PasswordGenerator