import React, { Component } from 'react';
import styles from '../../styles/HomePage.module.css'

export default function Footer () {
    return (
        <div className={styles.footer}>
            <div className={styles.footerWrapper}>
                <div className={styles.footerRow}>
                    <div className={styles.footerColumn}>
                        <p className={styles.footerTitle}>About</p>
                        <a className={styles.footerLink} href='#'>About Us</a>
                        <a className={styles.footerLink} href='/collection'>Our Collection</a>
                    </div>

                    <div className={styles.footerColumn}>
                        <p className={styles.footerTitle}>Social</p>
                        <a className={styles.footerLink} href="https://www.youtube.com">YouTube</a>
                        <a className={styles.footerLink} href="https://twitter.com">Twitter</a>
                    </div>
                </div>
            </div>
        </div>
    )
}