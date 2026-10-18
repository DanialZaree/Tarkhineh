"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight2, Trash } from "iconsax-react";
import { Stepper } from "@/components/ui/stepper";
import { AuthModal } from "@/components/AuthModal";
import {
  CART_STEPS,
  Step0Cart,
  Step1Info,
  Step2Payment,
  OrderSuccessView,
  AddressModal,
  type Address,
  type DeliveryMethod,
  type PaymentGateway,
  type PaymentMethod,
} from "./cart";
import {
  useCart,
  useAddresses,
  useAuth,
  createOrderFromCart,
} from "@/lib/siteStorage";

export default function CartPageContent() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const { addresses, upsertAddress, deleteAddress: storageDeleteAddress } = useAddresses();
  const { auth, login } = useAuth();
  const userPhone = auth.isLoggedIn && auth.phone ? auth.phone : null;

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("courier");
  const [orderNotes, setOrderNotes] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [newAddressTitle, setNewAddressTitle] = useState("");
  const [newAddressRecipient, setNewAddressRecipient] = useState("");
  const [newAddressPhone, setNewAddressPhone] = useState("");
  const [newAddressDetail, setNewAddressDetail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>("saman");
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [orderTrackingCode, setOrderTrackingCode] = useState("");

  const activeSelectedAddressId = selectedAddressId || (addresses.length > 0 ? addresses[0].id : null);

  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setNewAddressTitle("");
    setNewAddressRecipient("");
    setNewAddressPhone("");
    setNewAddressDetail("");
    setIsAddAddressOpen(true);
  };

  const handleOpenEditAddress = (addr: Address) => {
    setEditingAddressId(addr.id);
    setNewAddressTitle(addr.title);
    setNewAddressRecipient(addr.recipientName || "");
    setNewAddressPhone(addr.phone || "");
    setNewAddressDetail(addr.detail);
    setIsAddAddressOpen(true);
  };

  const handleSaveAddress = () => {
    if (!newAddressDetail.trim()) return;
    const addrId = editingAddressId || `addr-${Date.now()}`;
    const addrItem: Address = {
      id: addrId,
      title: newAddressTitle.trim() || "آدرس منتخب",
      recipientName: newAddressRecipient.trim() || undefined,
      phone: newAddressPhone.trim() || undefined,
      detail: newAddressDetail.trim(),
    };
    upsertAddress(addrItem);
    setSelectedAddressId(addrId);
    setIsAddAddressOpen(false);
  };

  const handleDeleteAddress = (id: string) => {
    storageDeleteAddress(id);
    if (activeSelectedAddressId === id) {
      const remaining = addresses.filter((a) => a.id !== id);
      setSelectedAddressId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const { totalCount, totalDiscount, payableAmount } = useMemo(() => {
    let count = 0;
    let discount = 0;
    let payable = 0;

    for (const item of items) {
      count += item.quantity;
      payable += item.price * item.quantity;
      if (item.oldPrice) {
        discount += (item.oldPrice - item.price) * item.quantity;
      }
    }

    return { totalCount: count, totalDiscount: discount, payableAmount: payable };
  }, [items]);

  const handleFinalPayment = () => {
    const randomCode = Math.floor(10000000 + Math.random() * 90000000).toString();
    const selectedAddr = addresses.find((a) => a.id === activeSelectedAddressId);
    const addrText = selectedAddr
      ? `${selectedAddr.title}: ${selectedAddr.detail}`
      : "ولیعصر، خیابان بزرگمهر، کوچه نسیم";

    createOrderFromCart({
      branch: "شعبه اکباتان",
      deliveryType: deliveryMethod === "courier" ? "ارسال توسط پیک" : "تحویل حضوری",
      address: addrText,
      trackingCode: randomCode,
      items,
      totalPrice: payableAmount,
      discount: totalDiscount,
    });

    setOrderTrackingCode(randomCode);
    setIsOrderSuccess(true);
  };

  const handleStep0Proceed = () => {
    if (userPhone) {
      setStepIndex(1);
    } else {
      setIsAuthOpen(true);
    }
  };

  const handleStep1Proceed = () => {
    if (!userPhone) {
      setIsAuthOpen(true);
      return;
    }
    setStepIndex(2);
  };

  if (isOrderSuccess) {
    return (
      <OrderSuccessView
        orderTrackingCode={orderTrackingCode}
        paymentMethod={paymentMethod}
        onGoHome={() => {
          setIsOrderSuccess(false);
          setStepIndex(0);
          router.push("/");
        }}
        onTrackOrder={() => {
          setIsOrderSuccess(false);
          setStepIndex(0);
          router.push("/orders");
        }}
      />
    );
  }

  return (
    <div dir="rtl" className="w-full font-sans pb-16 sm:pb-24">
      {/* mobile-title-bar */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 border-b border-neutral-100 bg-white">
        <button
          type="button"
          onClick={() => {
            if (stepIndex > 0) {
              setStepIndex((s) => s - 1);
            } else {
              router.back();
            }
          }}
          className="p-1 text-tarkhineh-dark hover:text-primary transition-colors cursor-pointer"
          aria-label="بازگشت"
        >
          <ArrowRight2 size={20} color="currentColor" variant="Linear" />
        </button>

        <h1 className="text-base font-bold text-tarkhineh-dark text-center">
          {stepIndex === 0 ? "سبد خرید" : stepIndex === 1 ? "تکمیل اطلاعات" : "پرداخت"}
        </h1>

        {stepIndex === 0 ? (
          <button
            type="button"
            onClick={clearCart}
            disabled={items.length === 0}
            className={`p-1 transition-colors ${
              items.length > 0 ? "text-neutral-400 hover:text-rose-500 cursor-pointer" : "text-neutral-300 cursor-not-allowed"
            }`}
            aria-label="حذف همه"
          >
            <Trash size={20} color="currentColor" variant="Linear" />
          </button>
        ) : (
          <div className="w-7" />
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* desktop-stepper */}
        <div className="hidden md:block py-8 lg:py-12">
          <Stepper
            steps={CART_STEPS}
            current={stepIndex}
            onStepClick={(i) => {
              if (i === 0) setStepIndex(0);
              else if (i === 1 && (userPhone || stepIndex >= 1)) setStepIndex(1);
              else if (i === 2 && userPhone && stepIndex >= 1) setStepIndex(2);
            }}
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* cart-empty */}
        {items.length === 0 ? (
          <div className="mt-4 md:mt-0 w-full border border-neutral-200 rounded-2xl md:rounded-3xl bg-white p-6 sm:p-12 md:p-20 flex flex-col items-center justify-center min-h-95 sm:min-h-115 md:min-h-130 shadow-2xs text-center">
            <p className="text-xs sm:text-sm md:text-base font-medium text-neutral-500 mb-6 sm:mb-8 select-none">
              شما در حال حاضر هیچ سفارشی ثبت نکرده‌اید!
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-6 sm:px-10 py-2 sm:py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all text-xs sm:text-sm font-medium shadow-2xs active:scale-95 cursor-pointer"
            >
              منوی رستوران
            </Link>
          </div>
        ) : (
          <>
            {/* step-0 */}
            {stepIndex === 0 && (
              <Step0Cart
                items={items}
                totalCount={totalCount}
                totalDiscount={totalDiscount}
                payableAmount={payableAmount}
                isLoggedIn={!!userPhone}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                onClearCart={clearCart}
                onProceed={handleStep0Proceed}
              />
            )}

            {/* step-1 */}
            {stepIndex === 1 && (
              <Step1Info
                deliveryMethod={deliveryMethod}
                onSetDeliveryMethod={setDeliveryMethod}
                addresses={addresses}
                selectedAddressId={activeSelectedAddressId}
                onSelectAddress={setSelectedAddressId}
                onOpenAddAddress={handleOpenAddAddress}
                onOpenEditAddress={handleOpenEditAddress}
                onDeleteAddress={handleDeleteAddress}
                orderNotes={orderNotes}
                onOrderNotesChange={setOrderNotes}
                items={items}
                totalCount={totalCount}
                totalDiscount={totalDiscount}
                payableAmount={payableAmount}
                isLoggedIn={!!userPhone}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                onClearCart={clearCart}
                onProceed={handleStep1Proceed}
              />
            )}

            {/* step-2 */}
            {stepIndex === 2 && (
              <Step2Payment
                discountCode={discountCode}
                onDiscountCodeChange={setDiscountCode}
                paymentMethod={paymentMethod}
                onSetPaymentMethod={setPaymentMethod}
                selectedGateway={selectedGateway}
                onSelectGateway={setSelectedGateway}
                items={items}
                totalCount={totalCount}
                totalDiscount={totalDiscount}
                payableAmount={payableAmount}
                deliveryMethod={deliveryMethod}
                isLoggedIn={!!userPhone}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                onClearCart={clearCart}
                onProceed={handleFinalPayment}
              />
            )}
          </>
        )}
      </div>
      <AddressModal
        isOpen={isAddAddressOpen}
        onClose={() => setIsAddAddressOpen(false)}
        isEditing={!!editingAddressId}
        title={newAddressTitle}
        onTitleChange={setNewAddressTitle}
        recipient={newAddressRecipient}
        onRecipientChange={setNewAddressRecipient}
        phone={newAddressPhone}
        onPhoneChange={setNewAddressPhone}
        detail={newAddressDetail}
        onDetailChange={setNewAddressDetail}
        onSave={handleSaveAddress}
      />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(phone) => {
          login(phone);
          setStepIndex(1);
        }}
      />
    </div>
  );
}
