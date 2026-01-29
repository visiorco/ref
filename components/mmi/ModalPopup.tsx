import styles from '../../app/mmi.module.css';

interface ModalPopupProps {
    isOpen: boolean;
    onClose: () => void;
    formData: any;
    setFormData: (data: any) => void;
    focused: any;
    setFocused: (data: any) => void;
    handleFormSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
    isSubmitted: boolean;
    maskPhone: (value: string) => string;
}

export default function ModalPopup({
    isOpen,
    onClose,
    formData,
    setFormData,
    focused,
    setFocused,
    handleFormSubmit,
    isSubmitting,
    isSubmitted,
    maskPhone
}: ModalPopupProps) {
    if (!isOpen) return null;

    return (
        <div className={`${styles.modalOverlay} ${styles.modalActive}`} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {!isSubmitted ? (
                    <>
                        <h2 className={styles.modalTitle}>Garanta sua vaga!</h2>
                        <form className={styles.popupForm} onSubmit={handleFormSubmit}>
                            <div className={styles.modalInputGroup}>
                                <input
                                    type="text"
                                    placeholder=" "
                                    className={styles.modalInput}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    onFocus={() => setFocused({ ...focused, name: true })}
                                    onBlur={() => setFocused({ ...focused, name: false })}
                                    required
                                />
                                <label className={`${styles.modalFloatingLabel} ${(formData.name || focused.name) ? styles.modalFloatingLabelActive : ''}`}>
                                    Nome
                                </label>
                            </div>

                            <div className={styles.modalInputGroup}>
                                <input
                                    type="email"
                                    placeholder=" "
                                    className={styles.modalInput}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    onFocus={() => setFocused({ ...focused, email: true })}
                                    onBlur={() => setFocused({ ...focused, email: false })}
                                    required
                                />
                                <label className={`${styles.modalFloatingLabel} ${(formData.email || focused.email) ? styles.modalFloatingLabelActive : ''}`}>
                                    E-mail
                                </label>
                            </div>

                            <div className={styles.modalInputGroup}>
                                <input
                                    type="tel"
                                    placeholder=" "
                                    className={styles.modalInput}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: maskPhone(e.target.value) })}
                                    onFocus={() => setFocused({ ...focused, phone: true })}
                                    onBlur={() => setFocused({ ...focused, phone: false })}
                                    required
                                />
                                <label className={`${styles.modalFloatingLabel} ${(formData.phone || focused.phone) ? styles.modalFloatingLabelActive : ''}`}>
                                    WhatsApp
                                </label>
                            </div>

                            <div className={styles.modalInputGroup}>
                                <input
                                    type="text"
                                    placeholder=" "
                                    className={styles.modalInput}
                                    value={formData.instagram}
                                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                    onFocus={() => setFocused({ ...focused, instagram: true })}
                                    onBlur={() => setFocused({ ...focused, instagram: false })}
                                    required
                                />
                                <label className={`${styles.modalFloatingLabel} ${(formData.instagram || focused.instagram) ? styles.modalFloatingLabelActive : ''}`}>
                                    Instagram
                                </label>
                            </div>

                            <div className={styles.modalInputGroup}>
                                <select
                                    className={styles.modalSelect}
                                    value={formData.revenue}
                                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                                    onFocus={() => setFocused({ ...focused, revenue: true })}
                                    onBlur={() => setFocused({ ...focused, revenue: false })}
                                    required
                                >
                                    <option value="" disabled hidden></option>
                                    <option value="Até R$5.000">Até R$5.000</option>
                                    <option value="R$5.001 a R$15.000">R$5.001 a R$15.000</option>
                                    <option value="R$15.001 a R$30.000">R$15.001 a R$30.000</option>
                                    <option value="R$30.001 a R$50.000">R$30.001 a R$50.000</option>
                                    <option value="R$50.001 a R$100.000">R$50.001 a R$100.000</option>
                                    <option value="Acima de R$100.000">Acima de R$100.000</option>
                                </select>
                                <label className={`${styles.modalFloatingLabel} ${(formData.revenue || focused.revenue) ? styles.modalFloatingLabelActive : ''}`}>
                                    Qual seu faturamento mensal?
                                </label>
                            </div>

                            <button
                                type="submit"
                                className={styles.modalSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Enviando...' : 'GARANTIR MINHA VAGA'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className={styles.successState}>
                        <div className={styles.successIcon}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2 className={styles.successTitle}>Inscrição Realizada!</h2>
                        <p className={styles.successText}>
                            Seus dados foram enviados com sucesso. <br />
                            Entraremos em contato em breve via WhatsApp.
                        </p>
                        <button className={styles.modalSubmit} onClick={onClose}>
                            FECHAR
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
