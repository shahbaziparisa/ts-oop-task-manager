export function autobinder(_: any, _2: string, descriptor: PropertyDescriptor) {
  // 1. تابع اصلی رو ذخیره می‌کنیم
  const originalMethod = descriptor.value;  // تابع submitHandler
  
  // 2. یه descriptor جدید می‌سازیم
  const myDescriptor: PropertyDescriptor = {
    configurable: true,
    
    // 3. getter - وقتی به متد دسترسی پیدا می‌کنیم، این اجرا میشه
    get() {
      // 4. this رو به نمونه کلاس bind می‌کنیم
      const boundFn = originalMethod.bind(this);
      // 5. تابع bound شده رو برمی‌گردونیم
      return boundFn;
    },
  };
  
  // 6. descriptor قدیمی رو با جدید عوض می‌کنیم
  return myDescriptor;
}