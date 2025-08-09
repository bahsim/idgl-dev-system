# Business Rules Reference

> **Level:** Tactical Implementation Reference  
> **Source:** Extracted from concept documentation  
> **Purpose:** Guide implementation without specific code patterns

---

## 🔐 Authentication Rules

**AR-001**: All modification operations require JWT authentication  
**AR-002**: Read operations support optional authentication for enhanced data  
**AR-003**: Password hashing required using bcrypt with appropriate salt rounds  
**AR-004**: JWT tokens expire after reasonable timeframe  

---

## 👤 User Management Rules

**UR-001**: Username must be unique across platform  
**UR-002**: Email must be unique and properly validated  
**UR-003**: Users can only modify their own profile data  
**UR-004**: Search functionality across username, email, and about fields  

---

## 🎁 Wish Management Rules

**WR-001**: Users can only edit/delete their own wishes  
**WR-002**: Wishes with existing offers cannot have price/description modified  
**WR-003**: Wishes with existing offers cannot be deleted  
**WR-004**: Raised amount is automatically calculated, not manually editable  
**WR-005**: Any authenticated user can copy any wish  
**WR-006**: Copied wishes reset counters and change ownership  
**WR-007**: Copying increments original wish's copied counter atomically  

---

## 💰 Offer Management Rules

**OR-001**: Users cannot create offers on their own wishes  
**OR-002**: Offer amount cannot exceed remaining needed amount  
**OR-003**: Total raised cannot exceed wish price  
**OR-004**: Offers are immutable after creation  
**OR-005**: Offers can be marked as hidden for privacy  
**OR-006**: Hidden offers still contribute to raised calculations  

---

## 👁️ Data Visibility Rules

**VR-001**: Wish owners see all offers including hidden ones  
**VR-002**: Non-owners only see non-hidden offers  
**VR-003**: Wish owners see progress calculations and participant lists  
**VR-004**: Non-owners see limited participant information  
**VR-005**: Anonymous users can view wishes but not offers/participants  

---

## 📊 Data Integrity Rules

**DR-001**: All monetary values maintain 2 decimal precision  
**DR-002**: Minimum monetary values enforced (price ≥ 1, amount ≥ 1)  
**DR-003**: Atomic operations required for copying and counter updates  
**DR-004**: Database constraints prevent orphaned records  
**DR-005**: Transaction wrapping for complex multi-entity operations  

---

## 🔍 Discovery Rules

**DS-001**: Last wishes returns 40 most recent items  
**DS-002**: Top wishes returns 20 most copied items  
**DS-003**: User search supports partial matching  
**DS-004**: Discovery endpoints support optional authentication  

---

## ⚠️ Error Handling Rules

**EH-001**: Ownership violations return forbidden status  
**EH-002**: Missing resources return not found status  
**EH-003**: Validation failures return bad request with details  
**EH-004**: Authentication failures return unauthorized status  
**EH-005**: Business rule violations return appropriate error messages  

---

## 📝 Default Values

**New Wishes**: copied = 0, raised = 0  
**New Offers**: hidden = false  
**User Avatar**: Default placeholder URL  
**User About**: Default descriptive text  

---

**Implementation Priority:**
1. Authentication foundation
2. Ownership validation  
3. Core business logic
4. Data visibility controls
5. Advanced features 