export enum UserRole{
     ADMIN='ADMIN',
     SUPERADMIN='SUPERADMIN',
     USER='USER'
}

export enum Status {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELED = 'canceled',
  PENDING_PAYMENT = 'pending_payment',
}

export enum Payment_Method {
  CARD = 'card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
  CRYPTO = 'crypto',
}

export enum Payment_Status{
    PENDING='pending',
    COMPLETED='completed',
    FAILED='failed',
    REFUNDED='refunded'
}

export enum Subscription_type{
    FREE='free',
    PREMIUM='premium',

}

export enum VideoQuality {
  Q240 = '240p',
  Q360 = '360p',
  Q480 = '480p',
  Q720 = '720p',
  Q1080 = '1080p',
  Q4K = '4K',
}

export enum Lang{
    UZB='uzb',
    EN='eng',
    RU='rus'
}