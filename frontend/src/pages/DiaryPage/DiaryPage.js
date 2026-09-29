import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DiaryDateCalendar from '../../components/Diary/DiaryDateCalendar/DiaryDateCalendar';
import DiaryAddProductForm from '../../components/Diary/DiaryAddProductForm/DiaryAddProductForm';
import DiaryProductsList from '../../components/Diary/DiaryProductsList/DiaryProductsList';
import {
  addDiaryProductThunk,
  deleteDiaryProductThunk,
  fetchDiaryByDate,
  setSelectedDate,
} from '../../redux/diarySlice';

// Arka plan yaprak resimleri
import diarySummaryDesktopBg from './diarysummarydesktopbg.png';
import diarySummaryTabletBg from './diarysummarytabletbg.png';

import styles from './DiaryPage.module.css';

const DiaryPage = () => {
  const dispatch = useDispatch();

  const { selectedDate, eatenProducts, daySummary } = useSelector(
    state => state.diary
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchDiaryByDate(selectedDate));
  }, [dispatch, selectedDate]);

  const handleDateChange = date => {
    const formattedDate = date.toISOString().split('T')[0];
    dispatch(setSelectedDate(formattedDate));
    setSelectedProduct(null);
  };

  const handleProductSelect = product => {
    setSelectedProduct(product);
  };

  const handleAdd = async product => {
    try {
      await dispatch(
        addDiaryProductThunk({
          date: selectedDate,
          // KRİTİK DÜZELTME: Backend'e giden ID'nin boş (undefined) olmasını engellemek
          // için MongoDB (_id) ve Frontend (id/productId) varyasyonlarının hepsini ekledik.
          productId: product._id || product.id || product.productId,
          weight: product.weight,
        })
      ).unwrap();

      await dispatch(fetchDiaryByDate(selectedDate)).unwrap();
      setSelectedProduct(null);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Ürün eklenirken hata oluştu:', error);
    }
  };

  const handleDelete = async id => {
    try {
      await dispatch(deleteDiaryProductThunk(id)).unwrap();
      dispatch(fetchDiaryByDate(selectedDate));
    } catch (error) {
      console.error('Ürün silinirken hata oluştu:', error);
    }
  };

  const formattedDate = selectedDate.split('-').reverse().join('.');

  return (
    <main className={styles.diaryPageLayout}>
      {/* SOL TARAF: GÜNLÜK İÇERİĞİ VE FORM */}
      <section className={styles.diaryContent}>
        <div className={styles.dateSection}>
          <h1 className={styles.dateTitle}>{formattedDate}</h1>
          <DiaryDateCalendar
            selectedDate={new Date(selectedDate)}
            onDateChange={handleDateChange}
          />
        </div>

        {/* Sadece Tablet ve Desktop'ta görünür */}
        <div className={styles.desktopAddForm}>
          <DiaryAddProductForm
            onAdd={handleAdd}
            selectedProduct={selectedProduct}
            onSelectProduct={handleProductSelect}
          />
        </div>

        {/* Tüketilen Ürünler Listesi */}
        <DiaryProductsList products={eatenProducts} onDelete={handleDelete} />

        {/* Sadece Mobil'de görünen yuvarlak + butonu */}
        <button
          className={styles.mobileAddButton}
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          aria-label="Add product"
        >
          +
        </button>
      </section>

      {/* SAĞ / ALT TARAF: ÖZET PANELİ */}
      <aside className={styles.summary}>
        {/* Yaprak Arka Planları */}
        <img
          className={`${styles.summaryBackground} ${styles.summaryDesktopBackground}`}
          src={diarySummaryDesktopBg}
          alt=""
          aria-hidden="true"
        />
        <img
          className={`${styles.summaryBackground} ${styles.summaryTabletBackground}`}
          src={diarySummaryTabletBg}
          alt=""
          aria-hidden="true"
        />

        <div className={styles.summaryContent}>
          <section className={styles.summarySection}>
            <h2>Summary for {formattedDate}</h2>
            <div className={styles.summaryList}>
              <div className={styles.summaryRow}>
                <span>Left</span>
                <span>{daySummary?.kcalLeft || 0} kcal</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Consumed</span>
                <span>{daySummary?.kcalConsumed || 0} kcal</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Daily rate</span>
                <span>{daySummary?.dailyRate || 0} kcal</span>
              </div>
              <div className={styles.summaryRow}>
                <span>n% of normal</span>
                <span>
                  {daySummary?.dailyRate
                    ? Math.round(
                        (daySummary.kcalConsumed / daySummary.dailyRate) * 100
                      )
                    : 0}
                  %
                </span>
              </div>
            </div>
          </section>

          <section className={styles.summarySection}>
            <h2>Food not recommended</h2>
            <ul className={styles.recommendedList}>
              <li>Flour products</li>
              <li>Milk</li>
              <li>Red meat</li>
              <li>Smoked meats</li>
            </ul>
          </section>
        </div>
      </aside>

      {/* MOBİL İÇİN ÜRÜN EKLEME MODALI */}
      {isAddModalOpen && (
        <div className={styles.addModal}>
          <div className={styles.addModalContent}>
            <button
              className={styles.modalBackButton}
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              aria-label="Close"
            >
              ←
            </button>
            <DiaryAddProductForm
              onAdd={handleAdd}
              selectedProduct={selectedProduct}
              onSelectProduct={handleProductSelect}
              isModal
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default DiaryPage;
