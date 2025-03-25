(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navmenu');

  function mobileNavToggle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    navMenu.classList.toggle('active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  // فتح وإغلاق القائمة الجانبية
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }


  // تشغيل القوائم الفرعية (Dropdowns)
  document.querySelectorAll('.navmenu .dropdown-toggle').forEach(dropdown => {
    dropdown.addEventListener('click', function (e) {
      e.preventDefault(); // منع فتح الرابط الافتراضي

      let parentLi = this.parentElement;

      // إغلاق جميع القوائم المفتوحة عند النقر على أخرى
      document.querySelectorAll('.navmenu .dropdown').forEach(item => {
        if (item !== parentLi) {
          item.classList.remove('active');
          let subMenu = item.querySelector('.dropdown-menu');
          if (subMenu) subMenu.style.display = 'none';
        }
      });

      // تبديل حالة القائمة الحالية
      parentLi.classList.toggle('active');
      let subMenu = parentLi.querySelector('.dropdown-menu');
      if (subMenu) {
        subMenu.style.display = parentLi.classList.contains('active') ? 'block' : 'none';
      }
    });
  });


  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }


  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);



  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();



// Navbar 

window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".branding");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// Counter

let nums = document.querySelectorAll(".nums .num");
let sec = document.querySelector(".about")
let started = false;
window.onscroll = function () {
  if (window.scrollY >= sec.offsetTop) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
};
function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 1500 / goal);
}






// navbar producte part

document.addEventListener("DOMContentLoaded", function () {
  const menuContainer = document.getElementById("menuContainer");



  const productData = [
    {
      title: "المنتجات",
      categories: [
        { name: "العزل المائي", link: "allProduct.html?category=waterproofing" },
        { name: "العناية بالخرسانه", link: "allProduct.html?category=concrete-care" },
        { name: "التبليط", link: "allProduct.html?category=tiling" },
        { name: "الأرضيات", link: "allProduct.html?category=flooring" },
        { name: "المواد الرابطة وطبقات الاساس", link: "allProduct.html?category=binders" },
        { name: "مواد العزل وملء الفواصل", link: "allProduct.html?category=sealants" },
        { name: "الجدران والواجهات", link: "allProduct.html?category=walls-facades" },
      ]
    },
  ];


  productData.forEach(section => {
    // إنشاء `div` جديد لكل مجموعة
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("dropdown-section");

    // إنشاء عنوان المجموعة
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("dropdown-header");
    titleDiv.textContent = section.title;
    sectionDiv.appendChild(titleDiv);

    // إنشاء قائمة العناصر
    section.categories.forEach(category => {
      const a = document.createElement("a");
      a.textContent = category.name;
      a.href = category.link;
      a.classList.add("dropdown-item");
      sectionDiv.appendChild(a);
    });

    // إضافة القسم إلى القائمة
    menuContainer.appendChild(sectionDiv);
  });

  console.log("✅ تم إنشاء القائمة بنجاح.");
});


// Producte 

const productsPage = [
  {
    name: "بيتو اس بي ار",
    discription: "هو عبارة عن مكون واحد من مادة البولي فينيل أسيتات عالية الجودة ، وهو عامل خلط وربط للمواد الأسمنتية. وهو ذو أساس مائي، ذو تأثير متغير الانسيابية، تم تصميمه خصيصًا لتعزيز خصائص الترابط وتحسين القوة الميكانيكية للخلطات الأسمنتية عند دمجها مع ماء الخلط. كما أنه يقلل من تشققات الانكماش خلال المراحل المبكرة من تصلب الأسمنت عن طريق تقليل فقدان الماء السطحي في الخلطات المطبقة حديثًا. يمكن تخفيفه في الموقع بمياه الشرب للتطبيقات المطلوبة",
    advantage: {
      advantage_1: "ترابط الخرسانة القديمة إلى الجديدة عند استخدامها كطبقة ملاط. علاوة على ذلك ، يتم استخدام هذا المنتج لتقويه و ربط اللياسة و التعشيش و الصبة الخرسانية للأرضيات",
      advantage_2: "لإنتاج قابلية ميكانيكية عالية قبل عمل خلطات اللياسة المختلفة على الأسطح الخرسانية والطوب والحجرية",
      advantage_3: "إنتاج و تقوية التعشيش و إصلاح و ترميم الخرسانة الخلوية داخليا وخارجيا",
    },
    id:"1",
    category: "binders",
    weight: "20 لتر",
    img: "assets/imge/product/بيتو  اس بي ار.jpeg",
    alt: "بيتو اس بي ار",
  },
  {
    name: "بيتو اكريليك",
    discription: "بيتو اكريليك ھو طلاء اسود الون فائق الجودة ویتكون من مركب واحد مرن ومصنوع من مادة الأكریلیك ومقاوم لتسرب المیاه ویمكن استخدامھ على الأسطح والمناطق الرطبة. تم تصمیم ھذا الطلاء لیعمل كحاجز متین ضد عوامل الجو والأشعة فوق البنفسجیة. كما أنھ طلاء مانع للكربنة. یستخدم الطلاء عند المعالجة الكاملة كطلاء قوي ومرن ولدن",
    advantage: {
      advantage_1: "یتسم بقوة شد عالیة وقدرة عظیمة على سد الشقوق",
      advantage_2: "یتسم بمقاومة الرطوبة والماء ",
      advantage_3: "یتسم بمقاومة الحرارة المرتفعة وسخونة الطاقة الشمسیة",
      advantage_4: "یتسم بأنھ مكون من مواد عضویة متطایرة قلیلة ذو لھا أساس مائي",
      advantage_5: "یتسم بمقاومة الأحماض السائة مثل الھیدروكربونات والكبریتات (سلفات) وأیونات الكلورید",
      advantage_6: "مادة غیر سامة",
    },
    id:"2",
    category: "waterproofing",
    weight: "20 كجم",
    img: "assets/imge/product/بيتو اكريليك.jpg",
    alt: "بيتو اكريليك",
  },
  {
    name: "بيتو انكر",
    discription: "معجون مكون ثلاث مكونات ذو أساس ايبوكسي لتثبيت أسياخ الحديد الإنشائية وتقفيل المسامات لسطح الخرسانة",
    advantage: {
      advantage_1: "مركب مناسب للتطبيق في الأسطح العمودية",
      advantage_2: "قوة التصاق عالية",
      advantage_3: "مناسب لتزيع أسياخ الحديد الإنشائية",
    },
    id:"3",
    category: "binders",
    weight: "1 كجم",
    img: "assets/imge/product/بيتو انكر.jpeg",
    alt: "بيتو انكر",
  },
  {
    name: "بيتو اوكسيدو",
    discription: "مركب بيتوميني مؤكسد (حار) يستخدم في العزل المائي للأساسات والقواعد والأسطح، ويوصى باستخدامة في المناطق شديدة الحرارة.",
    advantage: {
      advantage_1: "يعتبر البيتومين الممؤكسد الساخن مثل البيتومين الصلب",
      advantage_2: "له قوام غير سائل",
      advantage_3: "يلصق على السطح بعد عدة دقائق فقط من وضعه",
      advantage_4: "كما أنه يصبح ذو طبقة سميكة وقوية",
    },
    id:"4",
    category: "waterproofing",
    weight: "140 كجم",
    img: "assets/imge/product/بيتو اوكسيدو.jpeg",
    alt: "بيتو اوكسيدو",
  },
  {
    name: "بيتو ايمشلون",
    discription: "عبارة عن طلاء مستحلب مائي مقاوم للكبريتات. يتم تشكيله عن طريق الاستحلاب الأنيوني للقار المرن وهو مستقر ً وسهل التطبيق. يلتصق بجميع أنواع الأسطح ويمكن أيضا تخفيفه ليصبح طبقة أولية مخترقة للاستخدام على الأسطح المسامية ويمكن تطبيقة بالفرشاة",
    advantage: {
      advantage_1: "سهل التطبيق( الفرشاة والرولة والرش اللاهوائى )",
      advantage_2: "لا يحتاج الى تسخين ويطبق على البارد",
      advantage_3: "يمكن تطبيقه على الأسطح الرطبة . معدل تغطية عالية للكيلوجرام",
      advantage_4: "مناسب للعزل فى الأماكن المغلقة ( لايحتوى على مذيب )",
      advantage_5: "يعتبر بعد تصلده مقاوم جيد للعوامل الجوية والكيماويات والأحماض",
    },
    id:"5",
    category: "waterproofing",
    weight: "200 كجم",
    img: "assets/imge/product/بيتو ايمشلون.jpeg",
    pdf:"assets/imge/product/بيتو ايمشلون  pdf.pdf",
    alt: "بيتو ايمشلون",
  },
  {
    name: "بيتو باتي",
    discription: "هو معجون جاهز زيتي للجبس و الجدران من بوليمر يحتوي مواد كيميائية رابطة، وإضافات عالية الكفاءة يمتاز بالمتانة والتعبئة التامة للمسامات وقوة التصاق عالية مثالي الأعمال الدهان والديكور والتشطيبات",
    advantage: {
      advantage_1: "لجعل أسطح الجدران والخشب ناعمة وواضحة للغاية",
      advantage_2: "لجعل الجدران ناعمة لتطبيق الدهانات وورق الحائط والطلاء المحكم",
    },
    id:"6",
    category: "walls-facades",
    weight: "20 كجم",
    img: "assets/imge/product/بيتو باتي.jpg",
    alt: "بيتو باتي",
  },
  {
    name: "D41 بيتو برايمر",
    discription: "مركب بيتوميني سائل ذو تركيبة ممتازة يستخدم كطبقة تحضيرية لتغطية مسام الأسطح الخرسانية من خلال تكوين طبقة رقيقة لتحسين مستوى التصاق المركبات البيتومينية ولفائف العزل المائي على الأسطح ويمتاز بسرعة جفاف عالية",
    advantage: {
      advantage_1: "بيتو برايمر دهان أساس مناسب للأسطح والحوائط الخرسانية والمعدنية",
      advantage_2: "يستخدم بيتو برايمر تحت لفات العزل المائي لتحسن خصائص التصاق اللفات بالسطح المراد عزله، كما ينصح بشدة استخدامه تحت لفات بيتو رول للعزل المائي",
    },
    id:"7",
    category: "waterproofing",
    weight: "16 لتر",
    img: "assets/imge/product/بيتو برايمر  D41.jpeg",
    pdf: "assets/imge/product/بيتو برايمر  D41 pdf.pdf",
    alt: "بيتو برايمر 41D",
  },
  {
    name: "بيتو برسلان",
    discription: "عبارة عن مادة لاصقة من الملاط الأسمنتي تتكون من مواد رابطة هيدروليكية وركام مختارة وإضافات خاصة. يتم ً توفيره كمسحوق جاف في أكياس موزونة مسبقا وجاهزة للاستخدام في الموقع؛ فهو يتطلب فقط إضافة الماء النظيف لإنتاج ملاط قابل للتشغيل بسهولة. مناسب لملاط التثبيت الجاف، خاصة لبلاط البورسلين والرخام",
    advantage: {
      advantage_1: "خصائص مرونة عالية تجعله قادرا على تحمل أي اهتزازات أو تشوهات على سطح التثبيت",
      advantage_2: "قوة التصاق عالية",
      advantage_3: "زمن عمل طويل للمادة بعد تطبيقها",
      advantage_4: "سهل الاستخدام، يتمتع بقوام متماسك مع تشغيلية ممتازة",
      advantage_5: "مسبق الخلط، يحتاج فقط إلى اضافة الماء",
    },
    id:"8",
    category: "tiling",
    weight: "20 كجم",
    img: "assets/imge/product/بيتو برسلان.jpg",
    alt: "بيتو برسلان",
  },
  {
    name: "بيتو بروف",
    discription: "دهان عزل مائي لعزل الأساسات والأسطح والجدران المائلة والعمودية تحت سطح الأرض وفوقها، مثل الأسطح الأسمنتية",
    advantage: {
      advantage_1: "يغطي ضعف المساحة التي يغطيها البيتومين المؤكسد (الحار)",
      advantage_2: "% أسرع في التنفيذ بما يقارب 50 ",
      advantage_3: "لا توجد مخاوف من حدوث مخاطر أثناء العمل مثل الانفجار أو الفوران",
      advantage_4: "يحتاج لعدد عمال أقل في التنفيذ لعدم الحاجة للتسخين",
      advantage_5: "عدم سيلان المنتج في درجة الحرارة العالية أو بعد التنفيذ",
    },
    id:"9",
    category: "waterproofing",
    weight: "100 كجم",
    pdf: "assets/imge/product/بيتو بروف pdf.pdf",
    img: "assets/imge/product/بيتو بروف.jpeg",
    alt: "بيتو بروف",
  },
  {
    name: "بيتو بلج",
    discription: "مونة ترميم إسمنتية سريعة التصلب والنشفان تستخدم لسد تسريبات المياه من الفجوات والشقوق",
    advantage: {
      advantage_1: "اللون/ المظهر: مسحوق رمادي",
      advantage_2: "نسبة الخلط ٢٨٠: مل من الماء لكل ١ كغم بلوغ ١",
      advantage_3: "نفاذية الكلوريد: ١٫٤٠ لتر من الماء لكل ٥ كغم بلوغ ١",
      advantage_4: "زمن الجفاف الكلي: ١ دقيقة.",
      advantage_5: "مقاومة الإنضغاط : ١٠ ميجا باسكال في ٢ ساعتين. / ٢٠",
    },
    id:"10",
    category: "waterproofing",
    weight: "1 كجم",
    img: "assets/imge/product/بيتو بلج.jpg",
    alt: "بيتو بلج",
  },
  {
    name: "بيتو بودر",
    discription: "تساعد بودرة البلاط بفعالية كبيرة على رفع الخواص الفيزيائية للمنتج فهي تجعله مقاوما للتشوّه حيث ترفع منَ درجة صلابته ومقاومته بزيادة المرونة، وتجعل المنتج ذا مظهر خارجي جيد وملمسه ناعم، وتحافظ عليه من الانسلال، بالإضافة لذلك فهي تجعله سهل التشكيل وذلك بالرفع من انسيابيته وتشتته",
    advantage: {
      advantage_1: "سهلة الاستعمال",
      advantage_2: "منخفضة التكلفة",
    },
    id:"11",
    category: "tiling",
    weight: "10 كجم",
    img: "assets/imge/product/بيتو بودر.jpeg",
    alt: "بيتو بودر",
  },
  {
    name: "بيتو بول",
    discription: "عبارة عن مادة لاصقة من الملاط الأسمنتي تتكون من مواد رابطة هيدروليكية وركام مختارة وإضافات خاصة. يتم توفيره كمسحوق جاف ً في أكياس موزونة مسبقا وجاهزة للاستخدام في الموقع؛ فهو يتطلب فقط إضافة الماء النظيف لإنتاج ملاط قابل للتشغيل بسهولة. مناسب لملاط التثبيت الجاف، خاصة لجدران سيراميك حمامات السباحة وبلاط الأرضيات. يتم تطبيقه بسماكة تتراوح من ٣ مم إلى ١٠ مم، اعتمادً ا على نوع البلاط وجودة الركيزة",
    advantage: {
      advantage_1: "قوة التصاق مميزة وعالية الجودة",
      advantage_2: "مخصص للظروف الرطبة والمغمورة",
      advantage_3: "يمتاز بزمن عمل طويل",
      advantage_4: "سهل الخلط والتطبيق",
    },
    id:"12",
    category: "tiling",
    weight: "20 كجم",
    img: "assets/imge/product/بيتو بول.jpeg",
    alt: "بيتو بول",
  },
  {
    name: "بيتو بوند - 1",
    discription: "هو عامل ربط ذو أساس أكريليك مكون واحد للمواد الأسمنتية. إنه ذو أساس مائي، تم تصميمه خصيصً ا لتعزيز خصائص الترابط وتحسين القوة الميكانيكية لخلطات الجبس عند دمجها مع ماء الخلط. تعمل سندات الخلط الجاهز على تقليل تشققات الانكماش خلال المراحل المبكرة من تصلب الأسمنت عن طريق تقليل فقدان الماء السطحيًا. مثالي للاستخدام مع مجموعة متنوعة في الخلطات المطبقة حديث من الخلطات القائمة على الرمل/الأسمنت. يمكن تخفيفه في الموقع بمياه الشرب للتطبيقات المطلوبة.",
    advantage: {
      advantage_1: "يعزز التصاق المواد بالأسطح",
      advantage_2: "يقلل من تكوين التشققات في الطين",
      advantage_3: "يقلل من تسرب مزج الأسمنت",
      advantage_4: "VOC منتج صديق للبيئة بدون انبعاثات",
    },
    id:"13",
    category: "binders",
    weight: "4 لتر",
    img: "assets/imge/product/بيتو بوند -1 44444.jpeg",
    alt: "بيتو بوند - 1",
  },
  {
    name: "بيتو بوند - 1",
    discription: "هو عامل ربط ذو أساس أكريليك مكون واحد للمواد الأسمنتية. إنه ذو أساس مائي، تم تصميمه خصيصً ا لتعزيز خصائص الترابط وتحسين القوة الميكانيكية لخلطات الجبس عند دمجها مع ماء الخلط. تعمل سندات الخلط الجاهز على تقليل تشققات الانكماش خلال المراحل المبكرة من تصلب الأسمنت عن طريق تقليل فقدان الماء السطحيًا. مثالي للاستخدام مع مجموعة متنوعة في الخلطات المطبقة حديث من الخلطات القائمة على الرمل/الأسمنت. يمكن تخفيفه في الموقع بمياه الشرب للتطبيقات المطلوبة.",
    advantage: {
      advantage_1: "يعزز التصاق المواد بالأسطح",
      advantage_2: "يقلل من تكوين التشققات في الطين",
      advantage_3: "يقلل من تسرب مزج الأسمنت",
      advantage_4: "VOC منتج صديق للبيئة بدون انبعاثات",
    },
    id:"14",
    category: "binders",
    weight: "20 لتر",
    img: "assets/imge/product/بيتو بوند  - 1 20.jpeg",
    alt: "بيتو بوند - 1",
  },
  {
    name: "بيتو بوند - 2",
    discription: "هو عامل ربط قائم على البوليمر مكون واحد للمواد الأسمنتية. وهو ذو أساس مائي، تم تصميمه خصيصًا لتعزيز خصائص الترابط وتحسين القوة الميكانيكية للخلطات الأسمنتية عند دمجها مع ماء الخلط. يقلل من تشققات الانكماش خلال المراحل المبكرة من تصلب الأسمنت عن طريق تقليل فقدان الماء السطحي في الخلطات المطبقة حديثا. يمكن تخفيفه في الموقع بمياه الشرب للتطبيقات المطلوبة. مثالي للاستخدام مع بريمكس بلاستر",
    advantage: {
      advantage_1: "تحسن خواص المقاومة ومعالجة وإنضاج الخلطات الأسمنتية",
      advantage_2: "يعزز خواص الربط لخلطات اللياسة الإسكريد",
      advantage_3: "تقلل من الشروخ و النضح",
      advantage_4: "يعزز من القدرة على مقاومة التأكل والحك.",
    },
    id:"15",
    category: "binders",
    weight: "20 لتر",
    img: "assets/imge/product/بيتو بوند -2.jpeg",
    alt: "بيتو بوند - 2",
  },
  {
    name: "بيتو بيو سيل",
    discription: "تـم تصمیـم ھـذه المـادة لمنع التسرب المیـاه . تسختدم هذة المادة فــي فواصــل ووصــلات التحكــم. ومــن الممكــن وضعھــا واســتخدامھا فــي كلا الاتجاھین الأفقي والرأسي. كما أنھا مادة غیر سامة",
    advantage: {
      advantage_1: "مقاومة لتسرب المیاه بدرجة عالیة، حیث أنھا توف حلقة غلق",
      advantage_1: "ُمحكمة ودائمة ضد المیاه",
      advantage_1: "بمعظم ركائز البناء",
      advantage_1: "تتمیز بقدرة التصاق ممتازة",
      advantage_1: "تتمیز بقابلة استخدامھا في درجات حرارة مرتفعة",
      advantage_1: "لدیھا متانة ممتازة. مقاومة للأشعة فوق البنفسجیة وآثار العوامل الجویة",
      advantage_1: "(التجویة والتعریة) كما أنھا لا تفقد خصائصھا مع مرور الوقت",
      advantage_1: "یتمیز بسھولة الاستخدام ولا تتطلب استخدامھا مزج لمكوناتھا",
      advantage_1: "تتمیز بانخفاض نفاذیة المیاه",
      advantage_1: "بتوفر بعدة الوان ( الابيض - الرمادي - البيج - الاسود )",
    },
    id:"16",
    category: "sealants",
    weight: "600 مللي",
    pdf: "assets/imge/product/بيتو بيو سيل pdf.pdf",
    img: "assets/imge/product/بيتو بيو سيل.jpeg",
    alt: "بيتو بيو سيل",
  },
  {
    name: "بيتو تايل جراوت",
    discription: "عبارة عن ترويبة بلاط أسمنتي معدل بالبوليمر يتكون من مواد رابطة هيدروليكية وركام مختارة وإضافات خاصة وبوليمرات. يتم توفيره كمسحوق جاف في أكياس موزونة مسبقا وجاهزة للاستخدام في الموقع، الأمر الذي يتطلب فقط إضافة الماء النظيف لإنتاج ترويبة قابل للتشغيل بسهولة. تعتبر الترويبة مثالية لربط السيراميك والتيرازو",
    advantage: {
      advantage_1: "مصمم خصيصا للفراغات (الحلول) العريضة التي يصل عرضها إلى ٢٠ مم",
      advantage_2: "مقاومة عالية للحت",
      advantage_3: "امتصاصية منخفضة للماء، مناسب للمناطق الرطبة",
      advantage_4: "يتمتع بمقدار ضئيل للانكماش، وبتالي لا يتشقق",
      advantage_5: "لون منتظم، مما يوفر مظهرا جماليا للأسطح",
      advantage_6: "سهل التطبيق، يتمتع بقوام متماسك مع تشغيلية ممتازة",
      advantage_7: "متوفر بالعديد من الألوان الجذابة",
    },
    id:"17",
    category: "tiling",
    weight: "10 كجم",
    pdf: "assets/imge/product/TILE GROUT SAFETY DATA SHEET pdf.pdf",
    img: "assets/imge/product/TILE GROUT SAFETY DATA SHEET.jpeg",
    alt: "بيتو تايل جراوت",
  },
  {
    name: "بيتو توب بروف",
    discription: "دهان عزل مائي عالي الجودة لعزل الأساسات والأسطح والجدران المائلة والعمودية تحت سطح الأرض وفوقها، مثل الأسطح الأسمنتية كما يتحمل درجات حرارة عالية تصل إلى أكثر من ٥٠ درجة مئوية من دون أن يسيل الدهان وكذلك لا يتأثر بالتعرض لأشعة الشمس المباشرة.",
    advantage: {
      advantage_1: "متجانس وخالي من الماء",
      advantage_1: "يستخدم على البارد",
      advantage_1: "يقاوم التراكيز الضعيفة للاحماض والقواعد",
      advantage_1: "يتحمل الاكسدة لفترة طويلة",
      advantage_1: "لا ينفصل عند الجفاف",
      advantage_1: "يتحمل درجة حرارة حتى ٥٠ درجة مئوية",
    },
    id:"18",
    category: "waterproofing",
    weight: "100 لتر",
    img: "assets/imge/product/بيتو توب بروف.jpeg",
    alt: "بيتو توب بروف",
  },
  {
    name: "بيتو روف 6520",
    discription: "عبارة عن دهان مائي أكريليك مرن مخفف اساسه مكون من مكون واحد وله استخدامات متعددة للعزل المائي في البناء السكني والتجاري . المنتج متوفر باللون الأبيض",
    advantage: {
      advantage_1: "طبقة مقاومة للماء للأسقف والجدران والأسطح الملساء",
      advantage_2: "طبقة مقاومة للماء فوق بلاط و الخشب و الزنك و الفوم",
      advantage_3: "طبقة مقاومة للماء ووقائي فوق أسفنج البولي يوريثان",
    },
    id:"19",
    category: "waterproofing",
    weight: "20 كجم",
    pdf: "assets/imge/product/بيتو روف  6520 pdf.pdf",
    img: "assets/imge/product/بيتو روف  6520.jpeg",
    alt: "بيتو روف 6520",
  },
  {
    name: "بيتو روف 6523",
    discription: "عبارة عن دهان مائي أكريليك مرن عالي الجودة مكون من مكون واحد وله استخدامات متعددة للعزل المائي في البناء السكني والتجاري. المنتج متوفر باللون الأبيض",
    advantage: {
      advantage_1: "طلاء مطاطي ويتمتع بديمومة عالية",
      advantage_2: "ذو مكون واحد وسهل التطبيق",
      advantage_3: "متوفر بألوان مختلفة",
      advantage_4: "UV مقاوم للماء ولا يتأثر بأشعة",
      advantage_5: "لا يدعم نمو الفطريات",
      advantage_6: "سهل الصيانة",
    },
    id:"20",
    category: "waterproofing",
    weight: "20 كجم",
    pdf : "assets/imge/product/بيتو روف  6523 pdf.pdf",
    img: "assets/imge/product/بيتو روف  6520.jpeg",
    alt: "بيتو روف 6523",
  },
  {
    name: "بيتو رول",
    discription: "هو جيل جديد من لفائف البيتومينية المضاد للماء ، يتكون من البوليستر غير المنسوج، مشرب ومغطى على كلا الجانبين بطبقة من (البولي بروبيلين أتاكتيك) عبارة عن بوليمر معدل البيتومين ومصقول بالبولي إيثيلين القابل للانصهار بالحرارة على كل الجانبين",
    advantage: {
      advantage_1: "سهولة التركيب",
      advantage_2: "مقاومة عالية للمواد الكيميائية المذابة في التربة والأملاح والكبريتات المذابة في الماء",
      advantage_3: "متلائمة مع التغيرات المناخية",
      advantage_4: "الاستقرار التام في درجة الحرارة العالية",
      advantage_5: " يتوفر بعدة انواع ( ١٤٠ جرام ، ١٦٠ جرام ، ١٨٠ جرام ، ٢٠٠ جرام )",
    },
    id:"21",
    category: "waterproofing",
    weight: "10 متر",
    pdf: "assets/imge/product/بيتو رول pdf.pdf",
    img: "assets/imge/product/بيتو رول.jpg",
    alt: "بيتو رول",
  },
  {
    name: "بيتو رول مبحص",
    discription: "هو نسيج من البلوسيتر وعزل مائي عالي الأداء تم إنتاجه بطبقة من رقائق الأردواز الطبيعية مدمجة على السطح العلوي، لحماية الغشاء من الأشعة فوق البنفسجية ، وحماية طبقات الغشاء الموجودة أسفله، مع توفير سطح نهائي مقاوم للماء وذو مظهر جمالي",
    advantage: {
      advantage_1: "سهولة التركيب",
      advantage_2: "مقاومة عالية للمواد الكيميائية و الاشعه الفوق بنفسجية",
      advantage_3: "متلائمة مع التغيرات المناخية",
      advantage_4: "الاستقرار التام في درجة الحرارة العالية",
      advantage_5: "APP مشرب ومغطى على كلا الجانبين بطبقة من",
    },
    id:"22",
    category: "waterproofing",
    weight: "10 متر",
    img: "assets/imge/product/بيتو رول مبحص 10 متر.jpg",
    alt: "بيتو رول مبحص",
  },
  {
    name: "بيتو ستوب",
    discription: "هو عبارة عن قطعه من البي في سي لعزل و وقف تدفق الماء",
    advantage: {
      advantage_1: "متكامل و مستمر باربعة خطوط",
      advantage_2: "أطراف مسلحة للتثبيت الايجابي",
      advantage_3: "معتمد للأستخدام لخزانات مياه الشرب",
      advantage_4: "يتوفر بعدة احجام",
    },
    id:"23",
    category: "waterproofing",
    weight: "15 متر",
    img: "assets/imge/product/بيتو ستوب.jpg",
    alt: "بيتو ستوب",
  },
  {
    name: "بيتو سيراميك",
    discription: "عبارة عن مادة لاصقة من الملاط الأسمنتي تتكون من مواد رابطة هيدروليكية وركام مختارة وإضافات خاصة. يتم توفيره كمسحوق جاف في أكياس موزونة مسبقا وجاهزة للاستخدام في الموقع، الأمر الذي يتطلب فقط إضافة الماء النظيف لإنتاج ملاط قابل للتشغيل بسهولة. مثالي لتثبيت بلاط السيراميك وبلاط التيرازو ورخام الأرضيات وأحجار الرياض. يتم تطبيق بلاط السيراميك بسماكة تتراوح من ٣ مم إلى ١٠ مم، اعتمادً ا على نوع البلاط وجودته.",
    advantage: {
      advantage_1: "مثالية لتثبيت جميع أنواع بلاط السيراميك",
      advantage_2: "في المباني السكنية والتجارية",
      advantage_3: "تبليط على الأسطح الخرسانية الملساء والطوب خفيف الوزن والكتل وألواح الجبس",

    },
    id:"24",
    category: "tiling",
    weight: "20 كجم",
    pdf: "assets/imge/product/بيتو سيراميك  pdf.pdf",
    img: "assets/imge/product/بيتو سيراميك.jpg",
    alt: "بيتو سيراميك",
  },
  {
    name: "بيتو فلير",
    discription: "حشو عالي الجودة باللون الأبيض مصمم خصيصًا لإصلاح الشقوق الموجودة في مختلف الركائز وملئها",
    advantage: {
      advantage_1: "مصمم لإصلاح الشقوق الموجودة في الجدران والسقوف والأسطح المختلفة وملئها. ً يوفر هذا المنتج التصاقا ممتازا ومتانة ، مما يضمن الحصول على لمسة نهائية سلسة يوفر هذا المنتج التصاقا ممتاز وسلسة. مع وقت التجفيف السريع والتطبيق السهل ، يعد الخيار المثالي لإصلاحات التشققات الداخلية والخارجية في المشاريع السكنية والتجارية",
    },
    id:"25",
    category: "walls-facades",
    weight: "1.5 كجم",
    img: "assets/imge/product/بيتو فلير.png",
    alt: "بيتو فلير",
  },
  {
    name: "بيتو فليكس",
    discription: "عبارة عن طلاء أسمنتي مقاوم للماء مكون من مكونين من البوليمر المرن. إنه يتميز بخصائص فريدة لسد الشقوق حتى بعد غمر الماء لفترة طويلة. المنتج مناسب للاستخدام والاتصال بمياه الشرب ويمكنه تحمل الضغط الهيدروستاتيكي السلبي",
    advantage: {
      advantage_1: "سهلة فى الاستعمال",
      advantage_2: "قوام مستحلب أو يمكن خلطه على صورة مونة",
      advantage_3: "قوة إلتصاق عالية بالاسطح السليمة القوية",
      advantage_4: "غير منفذ للماء ، مرونة عالية وغير سام",
      advantage_5: "مقاومة عالية للصقيع ولأملاح إذابة الثلج",
      advantage_6: "يمكن إستعمال الرش فى تطبيقه",
      advantage_7: "صالح لمياه الشرب",
      advantage_8: "يتوفر بلونين ( رمادي و ابيض )",
    },
    id:"26",
    category: "waterproofing",
    weight: "20 كجم",
    pdf: "assets/imge/product/بيتو فليكس  pdf.pdf",
    img: "assets/imge/product/بيتو فليكس.jpg",
    alt: "بيتو فليكس",
  },
  {
    name: "FC بيتو كريت ",
    discription: "مونة اسمنتية ناعمة جاهزة بموصفات عالية محسنة بالبولمير و الألياف تحتوي على خاصية التحكم من الانكماش لأعمال الاصلاح الأنشائية المختلفة",
    advantage: {
      advantage_1: "سهولة الخلط والاستخدام بإضافة الماء فقط",
      advantage_2: "ذو قوام متجانس ومقاومة للإجهادات الميكانيكية",
      advantage_3: "يمكن إستخدامها بالرش بالطريقة المناسبة",
      advantage_4: "غير ضار ولا يحتوى على مواد سامة",
    },
    id:"27",
    category: "concrete-care",
    weight: "20 كجم",
    img: "assets/imge/product/بيتو كريت FC -- بيتو كريت TG.jpeg",
    pdf: "assets/imge/product/بيتو كريت FC pdf.pdf",
    alt: "بيتو كريت FC",
  },
  {
    name: "TG بيتو كريت ",
    discription: "مونة اسمنتية خشنة جاهزة بموصفات عالية محسنة بالبولمير و الألياف تحتوي على خاصية التحكم من الانكماش لأعمال الاصلاح الأنشائية المختلفة",
    advantage: {
      advantage_1: "سهولة الخلط والاستخدام بإضافة الماء فقط",
      advantage_2: "ذو إلتصاق جيد بالأسطح ويمكن الحصول على إلتصاق بكفاءة عالية بإستعماله مع سيكا لاتكس",
      advantage_3: "قليل الإنكماش ويسمح بنفاذية بخار الماء",
      advantage_4: "غير سريع الشك ويمكن أستخدامه فى درجات الحرارة العالية",
    },
    id:"28",
    category: "concrete-care",
    weight: "20 كجم",
    img: "assets/imge/product/بيتو كريت FC -- بيتو كريت TG.jpeg",
    pdf: "assets/imge/product/بيتو كريت TG pdf.pdf",
    alt: "بيتو كريت TG",
  },
  {
    name: "بيتو كلين",
    discription: "منظف بلاط وأرضيات قوي لإزالةا لأوساخ",
    advantage: {
      advantage_1: "يذيب بقع الجبس و الإسمنت و يزيلها بفرك بسيط",
      advantage_1: "مركب من مواد فعالة ضد البقع شديدة الإلتصاق بالأرضية",
      advantage_1: "باتباعك طريقة استخدام منظف ديكسن ستعيدي النضارة و اللمعان للأرضية",
      advantage_1: "لا يؤذي و لا يسبب تلف الأرضية و لا يغير لونها",
      advantage_1: "مصنوع من مواد عالية الجودة",
      advantage_1: "يفضل تخزينه في مكان بعيد عن متناول الجميع",
      advantage_1: "مناسب لكل أنواع الأرضيات",
      advantage_1: "منظف مركز شديد القوة ضد بقع الإسمنت و الجير",
    },
    id:"29",
    category: "flooring",
    weight: "4 لتر",
    img: "assets/imge/product/بيتو كلين.jpeg",
    alt: "بيتو كلين",
  },
  {
    name: "بيتو كوت اي بي 400",
    discription: "دهـان ايبوكسـي تسـوية ذاتيـة يعتمـد فـي تصنيعـه علـى راتنجـات بولـي اميـد خالـي مـن المذيبـات يسـتخدم لسـطح الخرسـانية يتكـون مـن مركبيـن الاســاس ومصلــب تخلــط بكميــات محــددة فــي الموقــع ويتــم تنفيذهــا فــي الموقـع مباشـرة بعد الخلط الجيد والتـام للكمية المحدد بدون الاخلال بالنسـب",
    advantage: {
      advantage_1: "سطح املس ناعم",
      advantage_2: "مقاومة عالية للمواد الكميائية",
      advantage_3: "قوة التصاق عالية",
      advantage_4: "مقاوم للصدمات و الاحكتاك",
      advantage_5: "غير نافذ للسوائل",
      advantage_6: "يتوفر بعدة الوان",
    },
    id:"30",
    category: "concrete-care",
    weight: "15 كجم",
    pdf: "assets/imge/product/BITU COAT EP400 -DATA SHEET.pdf",
    img: "assets/imge/product/BITU COAT EP400 -DATA SHEET.jpg",
    alt: "بيتو كوت اي بي 400",
  },
  {
    name: "P80100 بيتو لاتيكس",
    discription: "عبارة عن مستحلب بيتو ميني مطاطي مرن ينتج طبقة مرنة ومقاومة للبخار ومقاومة للماء يمكنها تحمل الحركات ولن يتتشقق في ظل الظروف الجوية القاسية. سهل التطبيق ويمكن تخفيفه بنسبة ١:١ في الماء ليكون بمثابة التمهيدي الخاص به، ويرتبط بالكامل بأي ركيزة بسبب محتواه العالي من المطاط",
    advantage: {
      advantage_1: "لايحتوى على المذيب ( يمكن تطبيقه فى الاماكن المغلقة )",
      advantage_1: "لها قوة إلتصاق عالية بالأسطح",
      advantage_1: "يمكن إستخدامها على الأسطح الرطبة",
      advantage_1: "مرونة عالية يحتوى على مادة مطاطية تساعد فى تغطية الشروخ الدقيقة",
      advantage_1: "لا يتأثر بدرجات الحرارة الجوية المرتفعة",
    },
    id:"31",
    category: "waterproofing",
    weight: "100 لتر",
    img: "assets/imge/product/بيتو لاتيكس  P80100.jpeg",
    alt: "بيتو لاتيكس 80100P",
  },
  {
    name: "P80100 بيتو لاتيكس",
    discription: "عبارة عن مستحلب بيتو ميني مطاطي مرن ينتج طبقة مرنة ومقاومة للبخار ومقاومة للماء يمكنها تحمل الحركات ولن يتتشقق في ظل الظروف الجوية القاسية. سهل التطبيق ويمكن تخفيفه بنسبة ١:١ في الماء ليكون بمثابة التمهيدي الخاص به، ويرتبط بالكامل بأي ركيزة بسبب محتواه العالي من المطاط",
    advantage: {
      advantage_1: "لايحتوى على المذيب ( يمكن تطبيقه فى الاماكن المغلقة )",
      advantage_1: "لها قوة إلتصاق عالية بالأسطح",
      advantage_1: "يمكن إستخدامها على الأسطح الرطبة",
      advantage_1: "مرونة عالية يحتوى على مادة مطاطية تساعد فى تغطية الشروخ الدقيقة",
      advantage_1: "لا يتأثر بدرجات الحرارة الجوية المرتفعة",
    },
    id:"32",
    category: "waterproofing",
    weight: "18 لتر",
    img: "assets/imge/product/بيتو لاتيكس  P80100 -2222222222222.jpeg",
    alt: "بيتو لاتيكس 80100P",
  },
  {
    name: "بيتو ميكس دبليو بي200",
    discription: "عبارة عن خليط بودرة متكامل مانع لتسرب المياه عالي الجودة وسهل الاستخدام للاستخدام في جميع أنواع الخلطات القائمة على الأسمنت. يعتمد على مزيج فريد كاره للماء من المكونات العضوية وغير العضوية المختارة بعناية ، والتي يتم تصنيعها في ظل ظروف خاضعة للرقابة لإعطاء منتج متسق وعالي الجودة. يغلق فعليًا سطح المادة الأسمنتية وينتج نظاما ذو نفاذية منخفضة",
    advantage: {
      advantage_1: "يمكن استخدامه على الاسطح الحجرية او الطوب أو خلافه",
      advantage_2: "يمنع النفاذية في الخرسانه والمونة الاسمنتية",
      advantage_3: "يعمل على اغلاق المسارات الشعرية بالمونة",
      advantage_4: "تحسين الخصائص التشغيلية للمونة",
      advantage_5: "لايساعد على تاكل حديد التسليح",
      advantage_6: "سهل الخلط والاستخدام",
    },
    id:"33",
    category: "waterproofing",
    weight: "20 كجم",
    img: "assets/imge/product/بيتو ميكس دبليو بي200.jpg",
    alt: "بيتو ميكس دبليو بي200",
  },
  {
    name: "بيتونيت",
    discription: "عبارة عن طبقة نهائية ناعمة ذات أساس أسمنتي تتكون من مواد رابطة هيدروليكية وركام محدد وإضافات خاصة. ً يتم توفيره كمسحوق جاف في أكياس موزونة مسبقا وجاهزة للاستخدام في الموقع، حيث يتطلب فقط إضافة الماء النظيف لإنتاج مادة يسهل العمل بها. هو منتج عالي الجودة للاستخدام متعدد الأغراض ذات لون ابيض . يمكن تطبيقه بسماكة من ١ مم إلى ٣ مم",
    advantage: {
      advantage_1: "مقاوم للماء",
      advantage_2: "ٍتجانس خال من الترهل",
      advantage_3: "مناسب للأسطح الرأسية والأسقف",
      advantage_4: "متوافق مع جميع أنواع الدهانات الزخرفية",
      advantage_5: "مناسب للظروف المناخية الاستوائية والحارة",
    },
    id:"34",
    category: "walls-facades",
    weight: "25 كجم",
    img: "assets/imge/product/بيتونيت.jpg",
    alt: "بيتونيت",
  },

];




document.addEventListener("DOMContentLoaded", function () {
  const productContainer = document.getElementById("productContainer");

  // استخراج الفئة من الرابط
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  // تصفية المنتجات بناءً على الفئة إذا تم تحديدها، وإلا عرض جميع المنتجات
  const filteredProducts = category
      ? productsPage.filter(product => product.category === category)
      : productsPage;

  // التحقق من وجود منتجات للعرض
  if (filteredProducts.length > 0) {
      filteredProducts.forEach((product, index) => {
          // إنشاء بطاقة المنتج
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");

          // تعبئة بطاقة المنتج بالمعلومات
          productCard.innerHTML = `
              <img src="${product.img}" alt="${product.alt}">
              <h3>${product.name}</h3>
              <p>${product.discription.split(" ").slice(0, 10).join(" ")}...</p>
              <p><strong>الوزن:</strong> ${product.weight}</p>
              <a href="product.html?id=${(product.id)}" class="details-btn">تفاصيل</a>
          `;

          // إضافة المنتج إلى الحاوية
          productContainer.appendChild(productCard);
      });
  } else {
      productContainer.innerHTML = `<p>❌ لا توجد منتجات متاحة لهذه الفئة.</p>`;
  }
});
