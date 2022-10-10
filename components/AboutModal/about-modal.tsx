import Image from 'next/image';
import styles from './about-modal.module.scss';
import { useBreakPoint, SIZE } from '@/util';
import { useMemo } from 'react';

export default function AboutModal() {
  const breakPoint = useBreakPoint();

  const headshotSize = useMemo(() => {
    const defaultSize = '225rem';

    if (!breakPoint.width) {
      return defaultSize;
    }

    if (breakPoint.value === SIZE.XS) {
      return breakPoint.width - 100;
    }

    return defaultSize;
  }, [breakPoint]);

  return (
    <div
      className='modal fade'
      id='about-modal'
      aria-labelledby='about-modal-label'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header border-0'>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>
          <div className={`modal-body ${styles['modal-body-wrapper']}`}>
            <h1
              id='about-modal-label'
              className='modal-title mb-3'
            >
              About
            </h1>
            <div className={`${styles['image-container']}`}>
              <Image
                src='/head-shot.jpg'
                alt='head-shot'
                objectFit='cover'
                width={headshotSize}
                height={headshotSize}
              />
            </div>
            <div className='mt-3'>
              Hey there, my name is <strong>Donray</strong>. I created this site out of a recent obsession I had, <a target='_blank' href='https://www.investopedia.com/terms/p/personalfinance.asp' rel='noreferrer'>personal finance</a>! 
              I grew up not knowing anything about personal finance and after some research and courses I grew much better 
              at it over time and found it really enjoyable and freeing. This site will slowly expand and grow as time comes, so far it just utilizes 
              the <a target='_blank' href='https://www.investopedia.com/terms/d/debt-avalanche.asp' rel='noreferrer'>debt avalanche method</a>. 
              I hope it helps anyone out there as much as it helped me. Have a wonderful day!
            </div>
            <div className={styles.socials}>
              <hr />
              <a 
                className='bi bi-github'
                target='_blank'
                rel='noreferrer'
                href='https://github.com/wdonray' 
              />

              <a 
                className='bi bi-linkedin'
                target='_blank'
                rel='noreferrer'
                href='https://www.linkedin.com/in/wdonray/'
              />

              <a 
                className='bi bi-send-fill'
                target='_blank'
                rel='noreferrer'
                href='https://mail.google.com/mail/?view=cm&fs=1&to=donrayxwilliams@gmail.com' 
              />
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}