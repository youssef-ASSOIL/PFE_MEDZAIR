class Medecin {
  String id;
  String name;
  String lastname;
  String idContact;
  String tele;
  String email;
  String rpps;

  // Constructor
  Medecin({
    required this.id,
    required this.name,
    required this.lastname,
    required this.idContact,
    required this.tele,
    required this.email,
    required this.rpps,
  });

  // Setters
  void setId(String id) {
    this.id = id;
  }

  void setName(String name) {
    this.name = name;
  }

  void setLastname(String lastname) {
    this.lastname = lastname;
  }

  void setIdContact(String idContact) {
    this.idContact = idContact;
  }

  void setTele(String tele) {
    this.tele = tele;
  }

  void setEmail(String email) {
    this.email = email;
  }

  void setRpps(String rpps) {
    this.rpps = rpps;
  }

  // Getters
  String getId() {
    return id;
  }

  String getName() {
    return name;
  }

  String getLastname() {
    return lastname;
  }

  String getIdContact() {
    return idContact;
  }

  String getTele() {
    return tele;
  }

  String getEmail() {
    return email;
  }

  String getRpps() {
    return rpps;
  }
}
