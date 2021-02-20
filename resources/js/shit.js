const categories = [
	{ value: 'apartment', label: 'ბინა' },
	{ value: 'house', label: 'სახლი' },
	{ value: 'commercial', label: 'კომერციული ფართი' },
	{ value: 'hotel', label: 'სასტუმრო' },
	{ value: 'land', label: 'მიწის ნაკვეთი' }
];
const contracts = [
	{ value: 'sell', label: 'იყიდება' },
	{ value: 'rentM', label: 'ქირავდება თვიურად' },
	{ value: 'rentD', label: 'ქირავდება დღიურად' },
	{ value: 'сollateral', label: 'გირავდება' }
];
const status = [
	{ value: 'new', label: 'ახალ აშენებული' },
	{ value: 'old', label: 'ძველი აშენებული' },
	{ value: 'wip', label: 'მშენებარე' }
];
const statusLand = [
	{ value: 'agricultural', label: 'სასოფლო სამეურნეო' },
	{ value: 'nonagricultural', label: 'არა სასოფლო სამეურნეო' },
	{ value: 'commercial', label: 'კომერციული' },
	{ value: 'special', label: 'სპეციალური' },
	{ value: 'construction', label: 'საინვესტიციო/სამშენებლო' }
];
const conditions = [
	{ value: 'new', label: 'ახალი გარემონტებული' },
	{ value: 'old', label: 'ძველი გარემონტებული' },
	{ value: 'needs', label: 'სარემონტო' },
	{ value: 'under', label: 'მიმდინარე რემონტი' },
	{ value: 'green', label: 'მწვანე კარკასი' },
	{ value: 'white', label: 'თეთრი კარკასი' },
	{ value: 'black', label: 'შავი კარკასი' }
];

const heating = [
	{ value: null, label: 'არა' },
	{ value: 'central', label: 'ცენტრალური' },
	{ value: 'gas', label: 'გაზის' },
	{ value: 'electrical', label: 'დენის' },
	{ value: 'floor', label: 'იატაკის' }
];
const hotWater = [
	{ value: null, label: 'არა' },
	{ value: 'central', label: 'ცენტრალური' },
	{ value: 'gas', label: 'გაზის' },
	{ value: 'electrical', label: 'დენის' },
	{ value: 'natural', label: 'ბუნებრივი' }
];
const storeroom = [
	{ value: null, label: 'არა' },
	{ value: 'basement', label: 'სარდაფი' },
	{ value: 'loft', label: 'სხვენი' },
	{ value: 'pantry', label: 'საკუჭნაო' },
	{ value: 'outside', label: 'გარე სათავსო' },
	{ value: 'public', label: 'საერთო სათავსო' },
	{ value: 'other', label: 'სხვა' }
];
const parking = [
	{ value: null, label: 'არა' },
	{ value: 'garage', label: 'ავტოფარეხი' },
	{ value: 'private', label: 'კორპუსის პარკინგი' },
	{ value: 'public', label: 'საერთო პარკინგი' }
];
const currencies = [
	{ value: 'lari', label: '₾' },
	{ value: 'dollar', label: '$' },
	{ value: 'euro', label: '€' },
	{ value: 'ruble', label: '₽' }
];
